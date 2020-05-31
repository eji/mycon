import * as TE from 'fp-ts/lib/TaskEither';
import FamilyMemberRepository from '../repositories/familyMemberRepository';
import FamilyMember from '../models/familyMember';
import AppError from '../../errors/AppError';

/**
 * 全ての家族メンバーを取得するためのユースケース
 */
export default class GetAllFamilyMembersUseCase {
  constructor(readonly familyMemberRepository: FamilyMemberRepository) {}

  execute = (): TE.TaskEither<AppError, FamilyMember[]> =>
    this.familyMemberRepository.all();
}
