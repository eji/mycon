import { Record } from 'immutable';
import ID, { genId } from './id';

export type FamilyMemberID = ID;

interface FamilyMemberProps {
  id: FamilyMemberID;
  /**
   * 家族の名前
   */
  name: string;
}

/**
 * 家族メンバー
 */
export default interface FamilyMember extends FamilyMemberProps {
  set<K extends keyof FamilyMemberProps>(
    key: K,
    value: FamilyMemberProps[K]
  ): this;
}

class FamilyMemberClass
  extends Record<FamilyMemberProps>({
    id: genId(),
    name: '',
  })
  implements FamilyMember {}

export const makeFamilyMember = (
  props: Omit<FamilyMemberProps, 'id'> & { id?: FamilyMemberID }
): FamilyMember => {
  const id = props?.id || genId();
  return new FamilyMemberClass({ ...props, id });
};
