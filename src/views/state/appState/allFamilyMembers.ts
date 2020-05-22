import { Reducer } from 'react';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import FamilyMember, {
  makeFamilyMember,
  FamilyMemberID,
} from '../../../domain/models/familyMember';
import { SaveFamilyMemberForm } from '../../forms/saveFamilyMemberFormSchema';
import SaveFamilyMemberUseCase from '../../../domain/useCases/saveFamilyMemberUseCase';
import RepositoryError from '../../../errors/repositoryError';

export type AllFamilyMembers = { [key: string]: FamilyMember };

/** action messages */

const saveFamilyMemberMsg = 'saveFamilyMember';

const allFamilyMembersMsgs = [saveFamilyMemberMsg];

/* actions */

export type SaveFamilyMemberAction = Action<
  typeof saveFamilyMemberMsg,
  { familyMember: FamilyMember }
>;

export type AllFamilyMembersAction = SaveFamilyMemberAction;

export const isAllFamilyMembersAction = createActionDistinguishFunction<
  AllFamilyMembersAction
>(allFamilyMembersMsgs);

/* action handler */

const saveFamiyMemberHandler: ActionHandler<
  AllFamilyMembers,
  SaveFamilyMemberAction
> = (allFamilyMembers, { familyMember }) => ({
  ...allFamilyMembers,
  [familyMember.id]: familyMember,
});

/* reducer */

export const allFamilyMembersReducer: Reducer<
  AllFamilyMembers,
  AllFamilyMembersAction
> = (allFamilyMembers, action) => {
  switch (action.type) {
    case saveFamilyMemberMsg:
      return saveFamiyMemberHandler(allFamilyMembers, action);
    default:
      return allFamilyMembers;
  }
};

/* action creator */

export const saveFamilyMember = (
  form: SaveFamilyMemberForm & { id?: FamilyMemberID }
): TE.TaskEither<RepositoryError, SaveFamilyMemberAction> => {
  const useCase = container.resolve(SaveFamilyMemberUseCase);
  const familyMember = makeFamilyMember(form);
  return pipe(
    useCase.execute({ familyMember }),
    TE.map((savedFamilyMember) => ({
      type: saveFamilyMemberMsg,
      familyMember: savedFamilyMember,
    }))
  );
};
