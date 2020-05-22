import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import InMemoryStore from '../../../drivers/inMemoryStore';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import FamilyMember, {
  FamilyMemberID,
  UnpersistedFamilyMember,
  makeFamilyMember,
} from '../../../domain/models/familyMember';
import FamilyMemberRepository from '../../../domain/repositories/familyMemberRepository';
import BaseError from '../../../errors/baseError';
import { genId } from '../../../domain/models/id';

export default class FamilyMemberRepositoryInMemory
  implements FamilyMemberRepository {
  readonly store: InMemoryStore<FamilyMemberID, FamilyMember>;

  constructor(store?: InMemoryStore<FamilyMemberID, FamilyMember>) {
    this.store = store || new InMemoryStore<FamilyMemberID, FamilyMember>();
  }

  all = (): TE.TaskEither<BaseError, FamilyMember[]> =>
    TE.right(this.store.values());

  findById = (id: FamilyMemberID): TE.TaskEither<BaseError, FamilyMember> =>
    pipe(
      this.store.get(id),
      TE.fromOption(() => new NotFoundError())
    );

  saveValue = (
    familyMember: FamilyMember | UnpersistedFamilyMember
  ): TE.TaskEither<BaseError, FamilyMember> => {
    const newFamilyMember = makeFamilyMember({
      id: familyMember.id || genId(),
      name: familyMember.name,
    });
    this.store.set(newFamilyMember.id, newFamilyMember);
    return TE.right(newFamilyMember);
  };
}
