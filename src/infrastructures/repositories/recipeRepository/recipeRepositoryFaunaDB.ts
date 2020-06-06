import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import gql from 'graphql-tag';
import { pipe } from 'fp-ts/lib/pipeable';
import { sequenceT } from 'fp-ts/lib/Apply';
import RecipeRepository from '../../../domain/repositories/recipeRepository';
import Recipe, { UnpersistedRecipe } from '../../../domain/models/recipe';
import AppError from '../../../errors/AppError';
import FaunaDBGraphQLClient from '../../../drivers/faunaDBGraphQLClient';
import { GraphQLIDTable } from '../../../utils/graphQLIDTable';
import { UserContext } from '../../../app/contexts/userContext';
import FindAllRecipesResponse, {
  buildRecipesFromFoundRecipesResponse,
  isFoundRecipesResponse,
} from './recipeRepositoryFaunaDB/findAllRecipesResponse';
import CreateRecipeResponse, {
  buildRecipeFromCreateRecipeResponse,
} from './recipeRepositoryFaunaDB/createRecipeResponse';
import { genId } from '../../../domain/models/id';
import ReplaceRecipeResponse, {
  buildRecipeFromReplaceRecipeResponse,
} from './recipeRepositoryFaunaDB/replaceRecipeResponse';
import { isPersisted } from '../../../types/unpersisted';
import RecipeResponse from './recipeRepositoryFaunaDB/recipeResponse';
import RecipeIngredientResponse from './recipeRepositoryFaunaDB/recipeIngredientResponse';

const findAllRecipesQuery = gql`
  query FindAllRecipesQuery($id: ID!) {
    findUserByID(id: $id) {
      recipes {
        data {
          _id
          recipeID
          name
          ingredients {
            data {
              _id
              foodstuff {
                _id
                foodstuffID
                name
                category
                nutrients
              }
              quantity
            }
          }
        }
      }
    }
  }
`;

// TODO: フラグメントを使って書き直すこと
// TODO: 既存の材料を削除する処理を考えること
const createRecipeMutation = gql`
  mutation CreateRecipeMutation($input: RecipeInput!) {
    createRecipe(data: $input) {
      _id
      recipeID
      name
      ingredients {
        data {
          _id
          foodstuff {
            _id
            foodstuffID
            name
            category
            nutrients
          }
          quantity
        }
      }
    }
  }
`;

const replaceRecipeMutation = gql`
  mutation UpdateRecipeMutation($id: ID!, $input: RecipeInput!) {
    updateRecipe(id: $id, data: $input) {
      _id
      recipeID
      name
      ingredients {
        data {
          _id
          foodstuff {
            _id
            foodstuffID
            name
            category
            nutrients
          }
          quantity
        }
      }
    }
  }
`;

const deleteOldRecipeIngredientMutation = gql`
  mutation DeleteOldRecipeIngredientMutation($id: ID!) {
    deleteRecipeIngredient(id: $id)
  }
`;

export default class RecipeRepositoryFaunaDB implements RecipeRepository {
  constructor(
    readonly client: FaunaDBGraphQLClient,
    readonly graphqlIDTable: GraphQLIDTable,
    readonly userContext: UserContext
  ) {}

  all = (): TE.TaskEither<AppError, Recipe[]> =>
    pipe(
      this.graphqlIDTable.getGraphQLUserID(this.userContext),
      TE.fromEither,
      TE.chain((id) =>
        pipe(
          this.client.query<FindAllRecipesResponse>({
            query: findAllRecipesQuery,
            variables: {
              id,
            },
          }),
          TE.filterOrElse(
            isFoundRecipesResponse,
            () => new AppError('graphql/user_not_found')
          ),
          TE.map((res) => {
            this.setRecipeIDs(res.findUserByID.recipes.data);
            this.setAllRecipeIngredientIDs(res.findUserByID.recipes.data);
            return res;
          }),
          TE.chainEitherK(buildRecipesFromFoundRecipesResponse)
        )
      )
    );

  saveValue = (
    recipe: Recipe | UnpersistedRecipe
  ): TE.TaskEither<AppError, Recipe> =>
    isPersisted<Recipe>(recipe)
      ? this.replaceValue(recipe)
      : this.createValue(recipe);

  private createValue = (
    recipe: UnpersistedRecipe
  ): TE.TaskEither<AppError, Recipe> =>
    pipe(
      sequenceT(E.either)(
        this.graphqlIDTable.getGraphQLUserID(this.userContext),
        this.buildIngredientsCreateParams(recipe)
      ),
      TE.fromEither,
      TE.chain(([userId, ingredientsCreateParams]) =>
        this.client.mutate<CreateRecipeResponse>({
          mutation: createRecipeMutation,
          variables: {
            input: {
              recipeID: genId(),
              name: recipe.name,
              user: {
                connect: userId,
              },
              ingredients: {
                create: ingredientsCreateParams,
              },
            },
          },
        })
      ),
      TE.map((res) => {
        this.setRecipeID(res.createRecipe);
        this.setRecipeIngredientIDs(res.createRecipe);
        return res;
      }),
      TE.chainEitherK(buildRecipeFromCreateRecipeResponse)
    );

  private replaceValue = (recipe: Recipe): TE.TaskEither<AppError, Recipe> =>
    pipe(
      sequenceT(E.either)(
        this.graphqlIDTable.getGraphQLUserID(this.userContext),
        this.buildIngredientsCreateParams(recipe)
      ),
      TE.fromEither,
      TE.chain(([userId, ingredientsCreateParams]) =>
        this.client.mutate<ReplaceRecipeResponse>({
          mutation: replaceRecipeMutation,
          variables: {
            input: {
              recipeID: recipe.id,
              name: recipe.name,
              user: {
                connect: userId,
              },
              ingredients: {
                create: ingredientsCreateParams,
              },
            },
          },
        })
      ),
      TE.map((res) => {
        this.setRecipeID(res.updateRecipe);
        this.setRecipeIngredientIDs(res.updateRecipe);
        return res;
      }),
      TE.chain((res) =>
        pipe(
          this.deleteOldRecipeIngredients(recipe),
          TE.map(() => res)
        )
      ),
      TE.chainEitherK(buildRecipeFromReplaceRecipeResponse)
    );

  private deleteRecipeIngredient = (
    graphqlRecipeIngredientID: string
  ): TE.TaskEither<AppError, unknown> =>
    this.client.mutate({
      mutation: deleteOldRecipeIngredientMutation,
      variables: {
        id: graphqlRecipeIngredientID,
      },
    });

  private deleteOldRecipeIngredients = (
    recipe: Recipe
  ): TE.TaskEither<AppError, unknown> =>
    pipe(
      this.getAllGraphQLRecipeIngredientIDs(recipe),
      TE.fromEither,
      TE.chain((ingredientIDs) =>
        A.array.sequence(TE.taskEither)(
          ingredientIDs.map(this.deleteRecipeIngredient)
        )
      )
    );

  private getAllGraphQLRecipeIngredientIDs = (
    recipe: Recipe
  ): E.Either<AppError, string[]> =>
    A.array.sequence(E.either)(
      recipe.ingredients.map((_, index) =>
        this.graphqlIDTable.get(this.ingredientDummyKey(recipe.id, index))
      )
    );

  private buildIngredientsCreateParams = (
    recipe: UnpersistedRecipe | Recipe
  ): E.Either<
    AppError,
    {
      foodstuff: {
        connect: string;
      };
      quantity: string;
    }[]
  > =>
    pipe(
      A.array.sequence(E.either)(
        recipe.ingredients.map((i) => this.graphqlIDTable.get(i.foodstuff.id))
      ),
      E.map((graphqlFoodstuffIds) =>
        recipe.ingredients.map((ingredient, index) => ({
          foodstuff: {
            connect: graphqlFoodstuffIds[index],
          },
          quantity: ingredient.quantity,
        }))
      )
    );

  private setRecipeID = (res: RecipeResponse): void =>
    // eslint-disable-next-line no-underscore-dangle
    this.graphqlIDTable.set(res.recipeID, res._id);

  private setRecipeIDs = (res: RecipeResponse[]): void =>
    res.forEach(this.setRecipeID);

  private ingredientDummyKey = (recipeID: string, index: number): string =>
    `RecipeIngredient:${recipeID}:${index}`;

  private setRecipeIngredientID = (
    recipeID: string,
    index: number,
    res: RecipeIngredientResponse
  ): void => {
    // eslint-disable-next-line no-underscore-dangle
    this.graphqlIDTable.set(this.ingredientDummyKey(recipeID, index), res._id);
  };

  private setAllRecipeIngredientIDs = (res: RecipeResponse[]): void =>
    res.forEach(this.setRecipeIngredientIDs);

  private setRecipeIngredientIDs = (res: RecipeResponse): void => {
    res.ingredients.data.forEach((v, i) => {
      this.setRecipeIngredientID(res.recipeID, i, v);
    });
  };
}
