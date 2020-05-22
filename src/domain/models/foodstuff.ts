import { Record, Set, merge } from 'immutable';
import ID from './id';
import Nutrient from './nutrient';
import FoodstuffCategory from './foodstuffCategory';
import Unpersisted from '../../types/unpersisted';

/**
 * 食材ID
 */
export type FoodstuffID = ID;

interface FoodstuffProps {
  /**
   * 食材ID
   */
  id?: FoodstuffID;

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

interface FoodstuffMethods {
  /**
   * 栄養素を追加
   */
  addNutrients(nutrients: Nutrient[]): this;

  /**
   * 栄養素を削除
   */
  removeNutrients(nutrients: Nutrient[]): this;

  equals(other: Foodstuff): boolean;

  toJSON(): FoodstuffProps;
}

/**
 * 食材
 */
export interface Foodstuff
  extends Readonly<FoodstuffProps>,
    Readonly<FoodstuffMethods> {
  /**
   * 食材ID
   */
  id: FoodstuffID;
}

export type UnpersistedFoodstuff = Unpersisted<Foodstuff>;

class FoodstuffClass extends Record<FoodstuffProps & { id?: FoodstuffID }>({
  id: undefined,
  name: '',
  nutrients: Set(),
  category: 'その他',
}) {
  addNutrients(nutrients: Nutrient[]): this {
    return this.set('nutrients', merge(this.nutrients, nutrients));
  }

  removeNutrients(nutrients: Nutrient[]): this {
    return this.set(
      'nutrients',
      this.nutrients.filterNot((item) => nutrients.includes(item))
    );
  }

  equals(other: Foodstuff): boolean {
    return this.id === other.id;
  }
}

export function makeFoodstuff(props: {
  name: string;
  nutrients: Nutrient[];
  category: FoodstuffCategory;
}): UnpersistedFoodstuff;
export function makeFoodstuff(props: {
  id: FoodstuffID;
  name: string;
  nutrients: Nutrient[];
  category: FoodstuffCategory;
}): Foodstuff;

export function makeFoodstuff(props: {
  id?: FoodstuffID;
  name: string;
  nutrients: Nutrient[];
  category: FoodstuffCategory;
}): Foodstuff | UnpersistedFoodstuff {
  const nutrientSet = Set(props.nutrients);
  return new FoodstuffClass({ ...props, id: props.id, nutrients: nutrientSet });
}
