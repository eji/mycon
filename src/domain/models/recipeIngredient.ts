import { Record } from 'immutable';
import Quantity from './quantity';
import { Foodstuff } from './foodstuff';

interface RecipeIngredientProps {
  /**
   * 食材
   */
  foodstuff: Foodstuff;

  /**
   * 分量
   */
  quantity: Quantity;
}

/**
 * 料理の材料
 */
export default interface RecipeIngredient
  extends Readonly<RecipeIngredientProps> {
  set<K extends keyof RecipeIngredientProps>(
    key: K,
    value: RecipeIngredientProps[K]
  ): this;
}

export const makeRecipeIngredient = (props: {
  foodstuff: Foodstuff;
  quantity: Quantity;
}): RecipeIngredient => {
  return new (class extends Record<RecipeIngredientProps>(props)
    implements RecipeIngredient {})(props);
};
