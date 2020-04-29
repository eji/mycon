import { Record } from "immutable";
import Recipe from "./recipe";

interface DailyMenuProps {
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
 * 一日のメニュー
 */
export default interface DailyMenu extends DailyMenuProps {
  set<K extends keyof DailyMenuProps>(key: K, value: DailyMenuProps[K]): this;

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

class DailyMenuClass
  extends Record<Readonly<DailyMenuProps>>({
    date: new Date(),
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  })
  implements DailyMenu {
  addRecipeToBreakfast(recipe: Recipe): this {
    return this.set("breakfastRecipes", [...this.breakfastRecipes, recipe]);
  }

  addRecipeToLunch(recipe: Recipe): this {
    return this.set("lunchRecipes", [...this.lunchRecipes, recipe]);
  }

  addRecipeToDinner(recipe: Recipe): this {
    return this.set("dinnerRecipes", [...this.dinnerRecipes, recipe]);
  }

  removeRecipeFromBreakfast(recipe: Recipe): this {
    return this.set(
      "breakfastRecipes",
      this.breakfastRecipes.filter((r) => !r.equals(recipe))
    );
  }

  removeRecipeFromLunch(recipe: Recipe): this {
    return this.set(
      "lunchRecipes",
      this.lunchRecipes.filter((r) => !r.equals(recipe))
    );
  }

  removeRecipeFromDinner(recipe: Recipe): this {
    return this.set(
      "dinnerRecipes",
      this.dinnerRecipes.filter((r) => !r.equals(recipe))
    );
  }

  allRecipes(): Recipe[] {
    return [
      ...this.breakfastRecipes,
      ...this.lunchRecipes,
      ...this.dinnerRecipes,
    ];
  }
}

export const makeDailyMenu = (props: DailyMenuProps): DailyMenu =>
  new DailyMenuClass(props);
