import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';
import { UnpersistedFoodAllergyHistory } from '../../../../domain/models/foodAllergyHistory';

export type CreateFoodAllergyHistoryRequest = {
  familyMemberId: string;
  foodstuffId: string;
};

export const isCreateFoodAllergyHistoryRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is CreateFoodAllergyHistoryRequest => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { familyMemberId, foodstuffId } = input;
  return typeof familyMemberId === 'string' && typeof foodstuffId === 'string';
};

export const createRequestFromFoodAllergyHistory = (
  foodAllergyHistory: UnpersistedFoodAllergyHistory
): CreateFoodAllergyHistoryRequest => ({
  familyMemberId: foodAllergyHistory.familyMember.id,
  foodstuffId: foodAllergyHistory.foodstuff.id,
});

export const getCreateFoodAllergyHistoryRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, CreateFoodAllergyHistoryRequest> =>
  E.fromPredicate(
    isCreateFoodAllergyHistoryRequest,
    () => new InvalidRequestError()
  )(request.body);
