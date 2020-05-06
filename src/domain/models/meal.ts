import { Record } from 'immutable';
import { Eq } from 'fp-ts/lib/Eq';
import * as F from 'fp-ts/lib/function';
import Recipe from './recipe';
import { genId } from './id';

export type MealID = string;

interface MealProps {
  id: MealID;

  /**
   * 食事の名前
   */
  name: string;

  /**
   * レシピの一覧
   */
  recipes: Recipe[];
}

/**
 * 1回の食事
 */
export default interface Meal extends MealProps, Eq<Meal> {
  /**
   * レシピを追加する
   */
  addRecipe(recipe: Recipe): this;

  /**
   * レシピを削除する
   */
  removeRecipe(recipe: Recipe): this;

  set<K extends keyof MealProps>(key: K, value: MealProps[K]): this;

  equals(other: Meal): boolean;

  notEquals(other: Meal): boolean;
}

class MealClass
  extends Record<Readonly<MealProps>>({
    id: genId(),
    name: '',
    recipes: [],
  })
  implements Meal {
  addRecipe = (recipe: Recipe): this => {
    return this.set('recipes', [...this.recipes, recipe]);
  };

  removeRecipe = (recipe: Recipe): this => {
    return this.set(
      'recipes',
      this.recipes.filter((r) => !r.equals(recipe))
    );
  };

  equals = (other: Meal): boolean => this.id === other.id;

  notEquals = F.not(this.equals);
}

export const makeMeal = (props: {
  recipes: Recipe[];
  id?: MealID;
  name?: string;
}): Meal => {
  const id = props.id || genId();
  const name = props.name || '';
  return new MealClass({ ...props, id, name });
};
