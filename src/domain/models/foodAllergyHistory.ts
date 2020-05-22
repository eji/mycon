import { Record } from 'immutable';
import ID from './id';
import FamilyMember from './familyMember';
import { Foodstuff } from './foodstuff';
import Unpersisted from '../../types/unpersisted';

export type FoodAllergyHistoryID = ID;

interface FoodAllergyHistoryProps {
  id: FoodAllergyHistoryID;

  /**
   * アレルギーが発症した家族
   */
  familyMember: FamilyMember;

  /**
   * アレルギーが発生した食品
   */
  foodstuff: Foodstuff;
}

/**
 * 食品アレルギー発症履歴
 */
export default interface FoodAllergyHistory extends FoodAllergyHistoryProps {
  set<K extends keyof FoodAllergyHistoryProps>(
    key: K,
    value: FoodAllergyHistoryProps[K]
  ): this;
}

export type UnpersistedFoodAllergyHistory = Unpersisted<FoodAllergyHistory>;

export function makeFoodAllergyHistory(
  props: FoodAllergyHistoryProps
): FoodAllergyHistory;
export function makeFoodAllergyHistory(
  props: Omit<FoodAllergyHistoryProps, 'id'> & { id?: FoodAllergyHistoryID }
): UnpersistedFoodAllergyHistory;
export function makeFoodAllergyHistory(
  props: Omit<FoodAllergyHistoryProps, 'id'> & { id?: FoodAllergyHistoryID }
): unknown {
  return new (class extends Record<
    Omit<FoodAllergyHistoryProps, 'id'> & { id?: FoodAllergyHistoryID }
  >({
    ...props,
  }) {})(props);
}
