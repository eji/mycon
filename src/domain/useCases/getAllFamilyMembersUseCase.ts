import * as TE from 'fp-ts/lib/TaskEither';
import RepositoryError from '../../errors/repositoryError';
import FamilyMemberRepository from '../repositories/familyMemberRepository';
import FamilyMember from '../models/familyMember';

/**
 * 全ての家族メンバーを取得するためのユースケース
 */
export default class GetAllFamilyMembersUseCase {
  constructor(readonly familyMemberRepository: FamilyMemberRepository) {}

  execute = (): TE.TaskEither<RepositoryError, FamilyMember[]> =>
    this.familyMemberRepository.all();
}
