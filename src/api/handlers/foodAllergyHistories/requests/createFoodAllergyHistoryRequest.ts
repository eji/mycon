import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import { UnpersistedFoodAllergyHistory } from '../../../../domain/models/foodAllergyHistory';
import AppError from '../../../../errors/AppError';

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
): E.Either<AppError, CreateFoodAllergyHistoryRequest> =>
  E.fromPredicate(
    isCreateFoodAllergyHistoryRequest,
    () => new AppError('http_req/invalid_request_error')
  )(request.body);
