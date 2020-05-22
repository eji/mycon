import { Record } from 'immutable';
import ID, { genId } from './id';
import Unpersisted from '../../types/unpersisted';

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
  equals(other: FamilyMember): boolean;
}

export type UnpersistedFamilyMember = Unpersisted<FamilyMember>;

class FamilyMemberClass
  extends Record<FamilyMemberProps>({
    id: genId(),
    name: '',
  })
  implements FamilyMember {
  equals(other: FamilyMember): boolean {
    return this.id === other.id;
  }
}

export function makeFamilyMember(props: {
  id: FamilyMemberID;
  name: string;
}): FamilyMember;
export function makeFamilyMember(props: {
  name: string;
}): UnpersistedFamilyMember;
export function makeFamilyMember(props: {
  id?: FamilyMemberID;
  name: string;
}): unknown {
  return new FamilyMemberClass({ ...props, id: props.id });
}
