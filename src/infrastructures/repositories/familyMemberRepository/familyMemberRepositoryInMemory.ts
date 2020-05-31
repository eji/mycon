import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import InMemoryStore from '../../../drivers/inMemoryStore';
import FamilyMember, {
  FamilyMemberID,
  UnpersistedFamilyMember,
  makeFamilyMember,
} from '../../../domain/models/familyMember';
import FamilyMemberRepository from '../../../domain/repositories/familyMemberRepository';
import { genId } from '../../../domain/models/id';
import AppError from '../../../errors/AppError';

export default class FamilyMemberRepositoryInMemory
  implements FamilyMemberRepository {
  readonly store: InMemoryStore<FamilyMemberID, FamilyMember>;

  constructor(store?: InMemoryStore<FamilyMemberID, FamilyMember>) {
    this.store = store || new InMemoryStore<FamilyMemberID, FamilyMember>();
  }

  all = (): TE.TaskEither<AppError, FamilyMember[]> =>
    TE.right(this.store.values());

  findById = (id: FamilyMemberID): TE.TaskEither<AppError, FamilyMember> =>
    pipe(
      this.store.get(id),
      TE.fromOption(() => new AppError('repos/not_found_error'))
    );

  saveValue = (
    familyMember: FamilyMember | UnpersistedFamilyMember
  ): TE.TaskEither<AppError, FamilyMember> => {
    const newFamilyMember = makeFamilyMember({
      id: familyMember.id || genId(),
      name: familyMember.name,
    });
    this.store.set(newFamilyMember.id, newFamilyMember);
    return TE.right(newFamilyMember);
  };
}
