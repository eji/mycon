import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import FamilyMember from '../../../../domain/models/familyMember';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';

export type ReplaceFamilyMemberRequestBody = {
  name: string;
};

export type ReplaceFamilyMemberRequest = ReplaceFamilyMemberRequestBody & {
  id: string;
};

export const isReplaceFamilyMemberRequestBody = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is ReplaceFamilyMemberRequestBody => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { name } = input;
  return typeof name === 'string';
};

export const requestFromFamilyMember = (
  familyMember: FamilyMember
): ReplaceFamilyMemberRequest => ({
  id: familyMember.id,
  name: familyMember.name,
});

export const getReplaceFamilyMemberRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, ReplaceFamilyMemberRequest> => {
  const { id } = request.query;
  if (id == null || typeof id !== 'string') {
    return E.left(new InvalidRequestError());
  }

  if (!isReplaceFamilyMemberRequestBody(request.body)) {
    return E.left(new InvalidRequestError());
  }

  return E.right({
    id,
    name: request.body.name,
  });
};
