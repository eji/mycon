import { Record } from 'immutable';
import { Eq } from 'fp-ts/lib/Eq';
import ID, { genId } from './id';
import RecipeIngredient from './recipeIngredient';
import Optional from '../../types/optional';

/**
 * レシピID
 */
export type RecipeID = ID;

interface RecipeProps {
  id: RecipeID;

  /**
   * 名前
   */
  name: string;

  /**
   * 材料一覧
   */
  ingredients: RecipeIngredient[];

  /**
   * 作り方のテキスト
   */
  textForcookingDirections: string[];
}

/**
 * 料理
 */
export default interface Recipe extends Readonly<RecipeProps>, Eq<Recipe> {
  set<K extends keyof RecipeProps>(key: K, value: RecipeProps[K]): this;
  equals(other: Recipe): boolean;
}

class RecipeClass
  extends Record<RecipeProps>({
    id: genId(),
    name: '',
    ingredients: [],
    textForcookingDirections: [],
  })
  implements Recipe {}

export const makeRecipe = (props: Optional<RecipeProps>): Recipe =>
  new RecipeClass(props);
