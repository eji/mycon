import { Record } from 'immutable';
import ID, { genId } from './id';
import FamilyMember from './familyMember';
import { Foodstuff } from './foodstuff';

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

export const makeFoodAllergyHistory = (
  props: Omit<FoodAllergyHistoryProps, 'id'> & { id?: FoodAllergyHistoryID }
): FoodAllergyHistory => {
  const id = props?.id || genId();

  return new (class
    extends Record<FoodAllergyHistoryProps>({
      ...props,
      id,
    })
    implements FoodAllergyHistory {})(props);
};
