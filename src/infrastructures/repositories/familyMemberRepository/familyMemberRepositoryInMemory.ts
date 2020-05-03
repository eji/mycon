import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import QueryError from '../../../errors/repositoryErrors/queryError';
import CommandError from '../../../errors/repositoryErrors/commandError';
import InMemoryStore from '../../../drivers/InMemoryStore';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import FamilyMember, {
  FamilyMemberID,
} from '../../../domain/models/familyMember';
import FamilyMemberRepository from '../../../domain/repositories/familyMemberRepository';

export default class FamilyMemberRepositoryInMemory
  implements FamilyMemberRepository {
  readonly store: InMemoryStore<FamilyMemberID, FamilyMember>;

  constructor(store?: InMemoryStore<FamilyMemberID, FamilyMember>) {
    this.store = store || new InMemoryStore<FamilyMemberID, FamilyMember>();
  }

  all = (): TE.TaskEither<QueryError, FamilyMember[]> =>
    TE.right(this.store.values());

  findById = (id: FamilyMemberID): TE.TaskEither<QueryError, FamilyMember> =>
    pipe(
      this.store.get(id),
      TE.fromOption(() => new NotFoundError())
    );

  saveValue = (
    familyMember: FamilyMember
  ): TE.TaskEither<CommandError, unknown> =>
    TE.right(this.store.set(familyMember.id, familyMember));
}
