import ErrorCode from './errorCode';

export default class AppError extends Error {
  readonly errorCode: ErrorCode;

  constructor(errorCode: ErrorCode, message?: string) {
    super(message);
    this.errorCode = errorCode;
  }
}
