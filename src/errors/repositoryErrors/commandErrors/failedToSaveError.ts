import CommandError from '../commandError';
import { makeServerErrorCode } from '../../../types/errorCode';

export default class FailedToSaveError extends CommandError {
  errorCode = makeServerErrorCode('failed_to_save_error');
}
