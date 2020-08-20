import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import gql from 'graphql-tag';
import { sequenceT } from 'fp-ts/lib/Apply';
import DailyMealRepository from '../../../domain/repositories/dailyMealRepository';
import DailyMeal from '../../../domain/models/dailyMeal';
import AppError from '../../../errors/AppError';
import dailyMealFields from '../../../GraphQL/fragments/dailyMealFields';
import FaunaDBGraphQLClient from '../../../drivers/faunaDBGraphQLClient';
import { GraphQLIDTable } from '../../../utils/graphQLIDTable';
import { UserContext } from '../../../app/contexts/userContext';
import FindAllDailyMealsResponse, {
  isFoundDailyMealsResponse,
  buildDailyMealsFromFoundDailyMealsResponse,
} from './dailyMealRepositoryFaunaDB/findAllDailyMealsResponse';
import CreateDailyMealResponse, {
  buildDailyMealFromCreateDailyMealResponse,
} from './dailyMealRepositoryFaunaDB/createDailyMealResponse';
import Meal from '../../../domain/models/meal';
import DailyMealResponse from './dailyMealRepositoryFaunaDB/dailyMealResponse';

/**
 * 全ての一日の食事を取得するためのクエリ
 */
const findAllDailyMealsQuery = gql`
  query FindAllDailyMealsQuery($id: ID!) {
    findUserByID(id: $id) {
      dailyMeals {
        data {
          ...DailyMealFields
        }
      }
    }
  }
  ${dailyMealFields}
`;

/**
 * 一日の食事を作成するためのミューテーション
 */
const createDailyMealMutation = gql`
  mutation CreateDailyMealMutation($input: DailyMealInput!) {
      createDailyMeal(data: $input) {
        ...DailyMealFields
      }
  }
  ${dailyMealFields}
}
`;

/**
 * DailyMealリポジトリのFaunaDB実装
 */
export default class DailyMealRepositoryFaunaDB implements DailyMealRepository {
  constructor(
    readonly client: FaunaDBGraphQLClient,
    readonly graphqlIDTable: GraphQLIDTable,
    readonly userContext: UserContext
  ) {}

  /**
   * 全てのDailyMealを取得
   */
  all = (): TE.TaskEither<AppError, DailyMeal[]> => {
    return pipe(
      this.graphqlIDTable.getGraphQLUserID(this.userContext),
      TE.fromEither,
      TE.chain((id) =>
        pipe(
          this.client.query<FindAllDailyMealsResponse>({
            query: findAllDailyMealsQuery,
            variables: {
              id,
            },
          }),
          TE.filterOrElse(
            isFoundDailyMealsResponse,
            () => new AppError('graphql/user_not_found')
          ),
          TE.map((res) => {
            this.setDailyMealIDs(res.findUserByID.dailyMeals.data);
            return res;
          }),
          TE.chainEitherK(buildDailyMealsFromFoundDailyMealsResponse)
        )
      )
    );
  };

  saveValue = (dailyMeal: DailyMeal): TE.TaskEither<AppError, DailyMeal> =>
    pipe(
      TE.fromEither(this.graphqlIDTable.getGraphQLUserID(this.userContext)),
      TE.chain((graphqlUserID) =>
        pipe(
          TE.fromEither(this.graphqlIDTable.get(dailyMeal.id)),
          TE.chain((graphqlDailyMealID) =>
            // this.replaceValue(graphqlUserID, graphqlDailyMealID, dailyMeal)
            this.replaceValue()
          ),
          TE.orElse(() => this.createValue(graphqlUserID, dailyMeal))
        )
      )
    );

  private buildCreateMealParams = (
    meal: Meal
  ): E.Either<
    AppError,
    {
      mealID: string;
      name: string;
      recipes: {
        connect: string[];
      };
    }
  > => {
    return pipe(
      A.array.sequence(E.either)(
        meal.recipes.map((recipe) => this.graphqlIDTable.get(recipe.id))
      ),
      E.map((graphqlRecipeIDs) => ({
        mealID: meal.id,
        name: meal.name,
        recipes: {
          connect: graphqlRecipeIDs,
        },
      }))
    );
  };

  private createValue = (
    graphqlUserID: string,
    dailyMeal: DailyMeal
  ): TE.TaskEither<AppError, DailyMeal> => {
    return pipe(
      sequenceT(E.either)(
        this.buildCreateMealParams(dailyMeal.breakfast),
        this.buildCreateMealParams(dailyMeal.lunch),
        this.buildCreateMealParams(dailyMeal.dinner),
        this.buildCreateMealParams(dailyMeal.snack)
      ),
      TE.fromEither,
      TE.chain(([breakfastParams, lunchParams, dinnerParams, snackParams]) =>
        this.client.mutate<CreateDailyMealResponse>({
          mutation: createDailyMealMutation,
          variables: {
            input: {
              dailyMealID: dailyMeal.id,
              user: {
                connect: graphqlUserID,
              },
              breakfast: breakfastParams,
              lunch: lunchParams,
              dinner: dinnerParams,
              snack: snackParams,
            },
          },
        })
      ),
      TE.map((res) => {
        this.setDailyMealID(res.createDailyMeal);
        return res;
      }),
      TE.chainEitherK(buildDailyMealFromCreateDailyMealResponse)
    );
  };

  private replaceValue = (): // graphqlUserID: string,
  // graphqlDailyMealID: string,
  // dailyMeal: DailyMeal
  TE.TaskEither<AppError, DailyMeal> => {
    return TE.left(new AppError('graphql/user_not_found'));
  };

  private setDailyMealID = (res: DailyMealResponse): void =>
    // eslint-disable-next-line no-underscore-dangle
    this.graphqlIDTable.set(res.dailyMealID, res._id);

  private setDailyMealIDs = (res: DailyMealResponse[]): void =>
    res.forEach(this.setDailyMealID);
}
