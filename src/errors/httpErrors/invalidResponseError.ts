import HttpError from '../httpError';
import { makeServerErrorCode } from '../../types/errorCode';

export default class InvalidResponseError extends HttpError {
  errorCode = makeServerErrorCode('invalid_response_error');

  constructor(message?: string) {
    super(-1, { message });
  }
}
