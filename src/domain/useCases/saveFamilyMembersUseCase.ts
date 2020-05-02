import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import RepositoryError from '../../errors/repositoryError';
import FamilyMember from '../models/familyMember';
import FamilyMemberRepository from '../repositories/familyMemberRepository';

type Params = {
  familyMembers: FamilyMember[];
};

type ReturnValue = TE.TaskEither<RepositoryError, FamilyMember[]>;

/**
 * 家族メンバー一覧を保存するためのユースケース
 */
export default class SaveRecipeUseCase {
  constructor(readonly familyMemberRepository: FamilyMemberRepository) {}

  execute(params: Params): ReturnValue {
    const { familyMembers } = params;
    return pipe(
      this.familyMemberRepository.saveValues(familyMembers),
      TE.map(() => familyMembers)
    );
  }
}
