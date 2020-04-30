import { Record, Set, merge } from 'immutable';
import ID, { genId } from './id';
import Nutrient from './nutrient';

/**
 * 食材ID
 */
export type FoodstuffID = ID;

interface FoodstuffProps {
  /**
   * 食材ID
   */
  id: FoodstuffID;

  /**
   * 食材名
   */
  name: string;

  /**
   * 含有栄養素一覧
   */
  nutrients: Set<Nutrient>;
}

/**
 * 食材
 */
export interface Foodstuff extends Readonly<FoodstuffProps> {
  /**
   * 栄養素を追加
   */
  addNutrients(nutrients: Nutrient[]): this;

  /**
   * 栄養素を削除
   */
  removeNutrients(nutrients: Nutrient[]): this;
}

class FoodstuffClass
  extends Record<FoodstuffProps>({
    id: genId(),
    name: '',
    nutrients: Set(),
  })
  implements Foodstuff {
  addNutrients(nutrients: Nutrient[]): this {
    return this.set('nutrients', merge(this.nutrients, nutrients));
  }

  removeNutrients(nutrients: Nutrient[]): this {
    return this.set(
      'nutrients',
      this.nutrients.filterNot((item) => nutrients.includes(item))
    );
  }
}

export const makeFoodstuff = (props: {
  id?: FoodstuffID;
  name: string;
  nutrients: Nutrient[];
}): Foodstuff => {
  const nutrientSet = Set(props.nutrients);
  return new FoodstuffClass({ ...props, nutrients: nutrientSet });
};
