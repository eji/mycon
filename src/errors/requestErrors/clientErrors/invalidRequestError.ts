import { makeClientErrorCode } from '../../../types/errorCode';
import ClientError from '../clientError';

export default class InvalidRequestError extends ClientError {
  errorCode = makeClientErrorCode('invalid_request_error');
}
