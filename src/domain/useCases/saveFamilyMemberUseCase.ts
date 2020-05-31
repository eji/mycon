import * as TE from 'fp-ts/lib/TaskEither';
import FamilyMember, { UnpersistedFamilyMember } from '../models/familyMember';
import FamilyMemberRepository from '../repositories/familyMemberRepository';
import AppError from '../../errors/AppError';

type Params = {
  familyMember: FamilyMember | UnpersistedFamilyMember;
};

/**
 * 家族メンバーを保存するためのユースケース
 */
export default class SaveFamilyMemberUseCase {
  constructor(readonly familyMemberRepository: FamilyMemberRepository) {}

  execute = (params: Params): TE.TaskEither<AppError, FamilyMember> =>
    this.familyMemberRepository.saveValue(params.familyMember);
}
