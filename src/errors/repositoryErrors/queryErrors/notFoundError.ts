import QueryError from '../queryError';
import { makeClientErrorCode } from '../../../types/errorCode';

export default class NotFoundError extends QueryError {
  errorCode = makeClientErrorCode('not_found_error');
}
