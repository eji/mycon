import { Record } from 'immutable';
import { Eq } from 'fp-ts/lib/Eq';
import ID, { genId } from './id';
import RecipeIngredient from './recipeIngredient';
import Unpersisted from '../../types/unpersisted';

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
}

/**
 * 料理
 */
export default interface Recipe extends Readonly<RecipeProps>, Eq<Recipe> {
  set<K extends keyof RecipeProps>(key: K, value: RecipeProps[K]): this;
  equals(other: Recipe): boolean;
}

export type UnpersistedRecipe = Unpersisted<Recipe>;

class RecipeClass extends Record<RecipeProps>({
  id: genId(),
  name: '',
  ingredients: [],
}) {}

export function makeRecipe(props: RecipeProps): Recipe;
export function makeRecipe(props: Omit<RecipeProps, 'id'>): UnpersistedRecipe;
export function makeRecipe(
  props: Omit<RecipeProps, 'id'> & { id?: RecipeID }
): unknown {
  return new RecipeClass({ ...props, id: props.id });
}

export const eqRecipe: Eq<Recipe> = {
  equals: (a: Recipe, b: Recipe) => a.id === b.id,
};
