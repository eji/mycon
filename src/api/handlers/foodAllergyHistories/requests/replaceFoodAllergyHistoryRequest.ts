import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';
import FoodAllergyHistory from '../../../../domain/models/foodAllergyHistory';

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
): E.Either<InvalidRequestError, ReplaceFoodAllergyHistoryRequest> => {
  const { id } = request.query;
  if (id == null || typeof id !== 'string') {
    return E.left(new InvalidRequestError());
  }

  if (!isReplaceFoodAllergyHistoryRequestBody(request.body)) {
    return E.left(new InvalidRequestError());
  }

  return E.right({
    id,
    familyMemberId: request.body.familyMemberId,
    foodstuffId: request.body.foodstuffId,
  });
};
