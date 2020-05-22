import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import FamilyMember, {
  FamilyMemberID,
  UnpersistedFamilyMember,
} from '../../../domain/models/familyMember';
import FamilyMemberRepository from '../../../domain/repositories/familyMemberRepository';
import BaseError from '../../../errors/baseError';
import RestClient from '../../../drivers/restClient';
import FamilyMembersResponse, {
  responseToFamilyMembers,
} from '../../../api/handlers/familyMembers/responses/familyMembersResponse';
import { isPersisted } from '../../../types/unpersisted';
import * as createReq from '../../../api/handlers/familyMembers/requests/createFamilyMemberRequest';
import * as replaceReq from '../../../api/handlers/familyMembers/requests/replaceFamilyMemberRequest';
import FamilyMemberResponse, {
  familyMemberFromResponse,
} from '../../../api/handlers/familyMembers/responses/familyMemberResponse';

export default class FamilyMemberRepositoryAppServer
  implements FamilyMemberRepository {
  constructor(readonly restClient: RestClient) {}

  all = (): TE.TaskEither<BaseError, FamilyMember[]> =>
    pipe(
      this.restClient.all<FamilyMembersResponse>(),
      TE.map(responseToFamilyMembers)
    );

  findById = (id: FamilyMemberID): TE.TaskEither<BaseError, FamilyMember> =>
    pipe(
      this.restClient.show<FamilyMemberResponse>(id),
      TE.map(familyMemberFromResponse)
    );

  saveValue = (
    familyMember: FamilyMember | UnpersistedFamilyMember
  ): TE.TaskEither<BaseError, FamilyMember> =>
    isPersisted<FamilyMember>(familyMember)
      ? this.replaceValue(familyMember)
      : this.createValue(familyMember);

  private replaceValue = (
    familyMember: FamilyMember
  ): TE.TaskEither<BaseError, FamilyMember> =>
    pipe(
      replaceReq.requestFromFamilyMember(familyMember),
      (request) =>
        this.restClient.replace<
          replaceReq.ReplaceFamilyMemberRequest,
          FamilyMemberResponse
        >(request),
      TE.map(familyMemberFromResponse)
    );

  private createValue = (
    familyMember: UnpersistedFamilyMember
  ): TE.TaskEither<BaseError, FamilyMember> =>
    pipe(
      createReq.requestFromFamilyMember(familyMember),
      (request) =>
        this.restClient.create<
          createReq.CreateFamilyMemberRequest,
          FamilyMemberResponse
        >(request),
      TE.map(familyMemberFromResponse)
    );
}
