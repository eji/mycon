import BaseError from './baseError';
import ErrorResponse from '../api/responses/errorResponse';
import { makeClientErrorCode } from '../types/errorCode';

/**
 * TODO: ここ直したい
 */
export default class RecievedErrorResponseError extends BaseError {
  errorCode = makeClientErrorCode('recieved_error_response_error');

  constructor(readonly errorResponse: ErrorResponse) {
    super();
  }
}
