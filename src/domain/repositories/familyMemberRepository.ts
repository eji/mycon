import { TaskEither } from 'fp-ts/lib/TaskEither';
import FamilyMember, {
  FamilyMemberID,
  UnpersistedFamilyMember,
} from '../models/familyMember';
import AppError from '../../errors/AppError';

export default interface FamilyMemberRepository {
  findById(id: FamilyMemberID): TaskEither<AppError, FamilyMember>;
  all(): TaskEither<AppError, FamilyMember[]>;
  saveValue(
    familyMember: FamilyMember | UnpersistedFamilyMember
  ): TaskEither<AppError, FamilyMember>;
}
