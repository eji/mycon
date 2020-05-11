import { Record, Set, merge } from 'immutable';
import ID, { genId } from './id';
import Nutrient from './nutrient';
import FoodstuffCategory from './foodstuffCategory';

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

  /**
   * 食材のカテゴリー
   */
  category: FoodstuffCategory;
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

  equals(other: Foodstuff): boolean;
}

class FoodstuffClass
  extends Record<FoodstuffProps>({
    id: genId(),
    name: '',
    nutrients: Set(),
    category: 'その他',
  })
  implements Foodstuff {
  addNutrients = (nutrients: Nutrient[]): this =>
    this.set('nutrients', merge(this.nutrients, nutrients));

  removeNutrients = (nutrients: Nutrient[]): this =>
    this.set(
      'nutrients',
      this.nutrients.filterNot((item) => nutrients.includes(item))
    );

  equals = (other: Foodstuff): boolean => this.id === other.id;
}

export const makeFoodstuff = (props: {
  id?: FoodstuffID;
  name: string;
  nutrients: Nutrient[];
  category: FoodstuffCategory;
}): Foodstuff => {
  const id = props.id || genId();
  const nutrientSet = Set(props.nutrients);
  return new FoodstuffClass({ ...props, id, nutrients: nutrientSet });
};
