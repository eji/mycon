import ErrorCode from '../types/errorCode';
import * as ErrorTracker from '../utils/errorTracker';

export default abstract class BaseError extends Error {
  abstract readonly errorCode: ErrorCode;

  constructor(message?: string) {
    super(message);
    ErrorTracker.captureMessage('hogeeeeeeeeeeeeeeethiPe');
    ErrorTracker.captureException(this);
  }
}
