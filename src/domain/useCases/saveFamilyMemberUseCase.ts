import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import RepositoryError from '../../errors/repositoryError';
import FamilyMember from '../models/familyMember';
import FamilyMemberRepository from '../repositories/familyMemberRepository';

type Params = {
  familyMember: FamilyMember;
};

/**
 * 家族メンバーを保存するためのユースケース
 */
export default class SaveFamilyMemberUseCase {
  constructor(readonly familyMemberRepository: FamilyMemberRepository) {}

  execute(params: Params): TE.TaskEither<RepositoryError, FamilyMember> {
    const { familyMember } = params;
    return pipe(
      this.familyMemberRepository.saveValue(familyMember),
      TE.map(() => familyMember)
    );
  }
}