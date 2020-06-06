import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as AP from 'fp-ts/lib/Apply';
import * as A from 'fp-ts/lib/Array';
import gql from 'graphql-tag';
import { pipe } from 'fp-ts/lib/pipeable';
import FoodstuffRepository from '../../../domain/repositories/foodstuffRepository';
import AppError from '../../../errors/AppError';
import {
  Foodstuff,
  UnpersistedFoodstuff,
} from '../../../domain/models/foodstuff';
import FaunaDBGraphQLClient from '../../../drivers/faunaDBGraphQLClient';
import { GraphQLIDTable, GraphQLID } from '../../../utils/graphQLIDTable';
import { UserContext } from '../../../app/contexts/userContext';
import FindAllFoodstuffsResponse, {
  isFoundFoodstuffsResponse,
  buildFoodstuffsFromFoundFoodstuffsResponse,
} from './foodstuffRepositoryFaunaDB/findAllFoodstuffsResponse';
import CreateFoodstuffResponse, {
  buildFoodstuffFromCreateFoodstuffResponse,
} from './foodstuffRepositoryFaunaDB/createFoodstuffResponse';
import { genId } from '../../../domain/models/id';
import { isPersisted } from '../../../types/unpersisted';
import UpdateFoodstuffResponse, {
  buildFoodstuffFromUpdateFoodstuffResponse,
} from './foodstuffRepositoryFaunaDB/updateFoodstuffResponse';

const findAllFoodstuffsQuery = gql`
  query FindAllFoodstuffs($id: ID!) {
    findUserByID(id: $id) {
      foodstuffs {
        data {
          _id
          foodstuffID
          name
          category
          nutrients
        }
      }
    }
  }
`;

const createFoodstuffMutation = gql`
  mutation CreateFoodstuffMutation($input: FoodstuffInput!) {
    createFoodstuff(data: $input) {
      _id
      foodstuffID
      name
      category
      nutrients
    }
  }
`;

export default class FoodstuffRepositoryFaunaDB implements FoodstuffRepository {
  constructor(
    readonly client: FaunaDBGraphQLClient,
    readonly graphqlIDTable: GraphQLIDTable,
    readonly userContext: UserContext
  ) {}

  all = (): TE.TaskEither<AppError, Foodstuff[]> =>
    pipe(
      this.getGraphQLUserID(),
      TE.fromEither,
      TE.chain((id) =>
        this.client.query<FindAllFoodstuffsResponse>({
          query: findAllFoodstuffsQuery,
          variables: {
            id,
          },
        })
      ),
      TE.filterOrElse(
        isFoundFoodstuffsResponse,
        () => new AppError('graphql/user_not_found')
      ),
      TE.map((res) => {
        res.findUserByID.foodstuffs.data.forEach((f) => {
          // eslint-disable-next-line no-underscore-dangle
          this.graphqlIDTable.set(f.foodstuffID, f._id);
        });
        return res;
      }),
      TE.chainEitherK(buildFoodstuffsFromFoundFoodstuffsResponse)
    );

  saveValue = (
    foodstuff: Foodstuff | UnpersistedFoodstuff
  ): TE.TaskEither<AppError, Foodstuff> => {
    if (isPersisted<Foodstuff>(foodstuff)) {
      return this.replaceValue(foodstuff);
    }
    return this.createValue(foodstuff);
  };

  saveValues = (
    foodstuffs: (Foodstuff | UnpersistedFoodstuff)[]
  ): TE.TaskEither<AppError, Foodstuff[]> =>
    A.array.sequence(TE.taskEither)(foodstuffs.map(this.saveValue));

  private getGraphQLUserID = (): E.Either<AppError, GraphQLID> =>
    pipe(
      this.userContext.getCurrentUser(),
      E.fromOption(() => new AppError('user_context/current_user_not_exists')),
      E.chain((user) => this.graphqlIDTable.get(user.id))
    );

  private createValue = (
    foodstuff: UnpersistedFoodstuff
  ): TE.TaskEither<AppError, Foodstuff> =>
    pipe(
      this.getGraphQLUserID(),
      TE.fromEither,
      TE.chain((userId) =>
        this.client.mutate<CreateFoodstuffResponse>({
          mutation: createFoodstuffMutation,
          variables: {
            input: {
              foodstuffID: genId(),
              name: foodstuff.name,
              user: {
                connect: userId,
              },
              nutrients: foodstuff.nutrients,
              category: foodstuff.category,
            },
          },
        })
      ),
      TE.map((res) => {
        this.graphqlIDTable.set(
          res.createFoodstuff.foodstuffID,
          // eslint-disable-next-line no-underscore-dangle
          res.createFoodstuff._id
        );
        return res;
      }),
      TE.chainEitherK(buildFoodstuffFromCreateFoodstuffResponse)
    );

  private replaceValue = (
    foodstuff: Foodstuff
  ): TE.TaskEither<AppError, Foodstuff> =>
    pipe(
      AP.sequenceT(E.either)(
        this.getGraphQLUserID(),
        this.graphqlIDTable.get(foodstuff.id)
      ),
      TE.fromEither,
      TE.chain(([graphqlUserID, graphqlFoodstuffID]) =>
        this.client.mutate<UpdateFoodstuffResponse>({
          mutation: createFoodstuffMutation,
          variables: {
            id: graphqlFoodstuffID,
            input: {
              foodstuffID: foodstuff.id,
              name: foodstuff.name,
              user: {
                connect: graphqlUserID,
              },
              nutrients: foodstuff.nutrients,
              category: foodstuff.category,
            },
          },
        })
      ),
      TE.map((res) => {
        this.graphqlIDTable.set(
          res.updateFoodstuff.foodstuffID,
          // eslint-disable-next-line no-underscore-dangle
          res.updateFoodstuff._id
        );
        return res;
      }),
      TE.chainEitherK(buildFoodstuffFromUpdateFoodstuffResponse)
    );
}
