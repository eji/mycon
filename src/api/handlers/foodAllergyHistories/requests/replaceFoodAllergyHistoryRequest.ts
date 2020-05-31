import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import FoodAllergyHistory from '../../../../domain/models/foodAllergyHistory';
import AppError from '../../../../errors/AppError';

export type ReplaceFoodAllergyHistoryRequestBody = {
  familyMemberId: string;
  foodstuffId: string;
};

export type ReplaceFoodAllergyHistoryRequest = ReplaceFoodAllergyHistoryRequestBody & {
  id: string;
};

export const isReplaceFoodAllergyHistoryRequestBody = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is ReplaceFoodAllergyHistoryRequestBody => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { familyMemberId, foodstuffId } = input;
  return typeof familyMemberId === 'string' && typeof foodstuffId === 'string';
};

export const replaceRequestFromFoodAllergyHistory = (
  foodAllergyHistory: FoodAllergyHistory
): ReplaceFoodAllergyHistoryRequest => ({
  id: foodAllergyHistory.id,
  familyMemberId: foodAllergyHistory.familyMember.id,
  foodstuffId: foodAllergyHistory.foodstuff.id,
});

export const getReplaceFoodAllergyHistoryRequest = (
  request: NowRequest
): E.Either<AppError, ReplaceFoodAllergyHistoryRequest> => {
  const { id } = request.query;
  if (id == null || typeof id !== 'string') {
    return E.left(new AppError('http_req/invalid_request_error'));
  }

  if (!isReplaceFoodAllergyHistoryRequestBody(request.body)) {
    return E.left(new AppError('http_req/invalid_request_error'));
  }

  return E.right({
    id,
    familyMemberId: request.body.familyMemberId,
    foodstuffId: request.body.foodstuffId,
  });
};
