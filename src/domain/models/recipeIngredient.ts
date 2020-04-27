import { Record } from "immutable";
import ID, { genId } from "./id";
import Quantity from "./quantity";
import Foodstuff from "./foodstuff";

/**
 * 材料ID
 */
export type RecipeIngredientID = ID;

interface RecipeIngredientProps {
  id: RecipeIngredientID;

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
  id?: RecipeIngredientID;
  foodstuff: Foodstuff;
  quantity: Quantity;
}): RecipeIngredient => {
  const id = props.id || genId();
  return new (class
    extends Record<RecipeIngredientProps>({
      ...props,
      id,
    })
    implements RecipeIngredient {})(props);
};
