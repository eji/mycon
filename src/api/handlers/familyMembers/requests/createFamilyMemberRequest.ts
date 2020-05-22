import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import { UnpersistedFamilyMember } from '../../../../domain/models/familyMember';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';

export type CreateFamilyMemberRequest = {
  name: string;
};

export const isCreateFamilyMemberRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is CreateFamilyMemberRequest => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { name } = input;
  return typeof name === 'string';
};

export const requestFromFamilyMember = (
  familyMember: UnpersistedFamilyMember
): CreateFamilyMemberRequest => ({
  name: familyMember.name,
});

export const getCreateFamilyMemberRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, CreateFamilyMemberRequest> =>
  isCreateFamilyMemberRequest(request.body)
    ? E.right(request.body)
    : E.left(new InvalidRequestError());
