import {
  FamilyMemberResponseValue,
  isFamilyMemberResponseValue,
  familyMemberFromResponseValue,
} from './familyMemberResponse';
import FamilyMember from '../../../../domain/models/familyMember';

type FamilyMembersResponse = {
  familyMembers: FamilyMemberResponseValue[];
};

export default FamilyMembersResponse;

export const isFamilyMemberssResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FamilyMembersResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { familyMembers } = value;
  if (typeof familyMembers !== 'object') {
    return false;
  }

  return (
    Array.isArray(familyMembers) &&
    familyMembers.every(isFamilyMemberResponseValue)
  );
};

export const responseToFamilyMembers = (
  response: FamilyMembersResponse
): FamilyMember[] => response.familyMembers.map(familyMemberFromResponseValue);
