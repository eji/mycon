import { Record } from "immutable";
import Recipe from "./recipe";

interface RecipesOfTheDayProps {
  /**
   * 対象の日
   */
  date: Date;

  /**
   * 朝食のレシピ一覧
   */
  breakfastRecipes: Recipe[];

  /**
   * 昼食のレシピ一覧
   */
  lunchRecipes: Recipe[];

  /**
   * 夕食のレシピ一覧
   */
  dinnerRecipes: Recipe[];
}

/**
 * 一日のレシピ一覧
 */
export default interface RecipesOfTheDay extends RecipesOfTheDayProps {
  set<K extends keyof RecipesOfTheDayProps>(
    key: K,
    value: RecipesOfTheDayProps[K]
  ): this;

  /**
   * 朝食にレシピを追加する
   */
  addRecipeToBreakfast(recipe: Recipe): this;

  /**
   * 昼食にレシピを追加する
   */
  addRecipeToLunch(recipe: Recipe): this;

  /**
   * 夕食にレシピを追加する
   */
  addRecipeToDinner(recipe: Recipe): this;

  /**
   * 夕食からレシピを削除する
   */
  removeRecipeFromBreakfast(recipe: Recipe): this;

  /**
   * 夕食からレシピを削除する
   */
  removeRecipeFromLunch(recipe: Recipe): this;

  /**
   * 夕食からレシピを削除する
   */
  removeRecipeFromDinner(recipe: Recipe): this;

  /**
   * 全てのレシピを取得
   */
  allRecipes(): Recipe[];
}

class RecipesOfTheDayClass
  extends Record<Readonly<RecipesOfTheDayProps>>({
    date: new Date(),
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  })
  implements RecipesOfTheDay {
  addRecipeToBreakfast(recipe: Recipe): this {
    // FIXME
    return this;
  }

  addRecipeToLunch(recipe: Recipe): this {
    // FIXME
    return this;
  }

  addRecipeToDinner(recipe: Recipe): this {
    // FIXME
    return this;
  }

  removeRecipeFromBreakfast(recipe: Recipe): this {
    // FIXME
    return this;
  }

  removeRecipeFromLunch(recipe: Recipe): this {
    // FIXME
    return this;
  }

  removeRecipeFromDinner(recipe: Recipe): this {
    // FIXME
    return this;
  }

  allRecipes(): Recipe[] {
    return [
      ...this.breakfastRecipes,
      ...this.lunchRecipes,
      ...this.dinnerRecipes,
    ];
  }
}

export const makeRecipesOfTheDay = (
  props: RecipesOfTheDayProps
): RecipesOfTheDay => new RecipesOfTheDayClass(props);
