import { makeClientErrorCode } from '../../../types/errorCode';
import ServerError from '../serverError';

export default class NotImplementedError extends ServerError {
  errorCode = makeClientErrorCode('not_implemented_error');
}
