type ErrorCode = string;

export default ErrorCode;

export type ErrorCategory = 'server' | 'client';

export const makeErrorCode = (
  category: ErrorCategory,
  errorKey: string
): ErrorCode => `${category}_${errorKey}`;

export const makeServerErrorCode = (errorKey: string): ErrorCode =>
  makeErrorCode('server', errorKey);

export const makeClientErrorCode = (errorKey: string): ErrorCode =>
  makeErrorCode('client', errorKey);

const errorCodeRegExp = /^(?<category>client|server)_(.+)$/;

export const isErrorCode = (value: unknown): value is ErrorCategory => {
  if (typeof value !== 'string') {
    return false;
  }
  return value.match(errorCodeRegExp) !== null;
};

export const errorCategory = (errorCode: ErrorCode): ErrorCategory => {
  const match = errorCode.match(errorCodeRegExp);
  if (match === null) {
    throw new Error('Invalid ErrorCode format');
  }

  return match[1] as ErrorCategory;
};

export const isServerError = (errorCode: ErrorCode): boolean =>
  errorCategory(errorCode) === 'server';

export const isClientError = (errorCode: ErrorCode): boolean =>
  errorCategory(errorCode) === 'client';

export const errorKey = (errorCode: ErrorCode): string => {
  const match = errorCode.match(errorCodeRegExp);
  if (match === null) {
    throw new Error('Invalid ErrorCode format');
  }

  return match[2];
};
