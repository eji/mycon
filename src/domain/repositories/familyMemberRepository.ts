import { TaskEither } from 'fp-ts/lib/TaskEither';
import QueryError from '../../errors/repositoryErrors/queryError';
import CommandError from '../../errors/repositoryErrors/commandError';
import FamilyMember, { FamilyMemberID } from '../models/familyMember';

export default interface FamilyMemberRepository {
  findById(id: FamilyMemberID): TaskEither<QueryError, FamilyMember>;
  all(): TaskEither<QueryError, FamilyMember[]>;
  saveValue(familyMember: FamilyMember): TaskEither<CommandError, unknown>;
}
