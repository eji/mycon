import FamilyMember, {
  makeFamilyMember,
  FamilyMemberID,
} from '../../../../domain/models/familyMember';

export type FamilyMemberResponseValue = {
  id: string;
  name: string;
};

type FamilyMemberResponse = {
  familyMember: FamilyMemberResponseValue;
};

export default FamilyMemberResponse;

export const isFamilyMemberResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FamilyMemberResponseValue => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  const { id, name } = value;
  return typeof id === 'string' && typeof name === 'string';
};

export const isFamilyMemberResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FamilyMemberResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { foodstuff } = value;
  if (typeof foodstuff !== 'object') {
    return false;
  }

  return isFamilyMemberResponseValue(foodstuff);
};

export const familyMemberFromResponseValue = (
  value: FamilyMemberResponseValue
): FamilyMember => {
  const { id, name } = value;
  return makeFamilyMember({
    id: id as FamilyMemberID,
    name,
  });
};

export const familyMemberFromResponse = (
  response: FamilyMemberResponse
): FamilyMember => familyMemberFromResponseValue(response.familyMember);

export const responseValueFromFamilyMember = (
  familyMember: FamilyMember
): FamilyMemberResponseValue => ({
  id: familyMember.id,
  name: familyMember.name,
});

export const responseFromFamilyMember = (
  familyMember: FamilyMember
): FamilyMemberResponse => ({
  familyMember: responseValueFromFamilyMember(familyMember),
});
