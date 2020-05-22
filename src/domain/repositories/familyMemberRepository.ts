import { TaskEither } from 'fp-ts/lib/TaskEither';
import FamilyMember, {
  FamilyMemberID,
  UnpersistedFamilyMember,
} from '../models/familyMember';
import BaseError from '../../errors/baseError';

export default interface FamilyMemberRepository {
  findById(id: FamilyMemberID): TaskEither<BaseError, FamilyMember>;
  all(): TaskEither<BaseError, FamilyMember[]>;
  saveValue(
    familyMember: FamilyMember | UnpersistedFamilyMember
  ): TaskEither<BaseError, FamilyMember>;
}
