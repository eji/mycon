import BaseError from '../../errors/baseError';
import ErrorCode, { makeServerErrorCode } from '../../types/errorCode';

type ErrorResponse = {
  error: {
    errorCode: ErrorCode;
    errorMessage: string;
  };
};

export default ErrorResponse;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isErrorResponse = (value: any): value is ErrorResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { error } = value;
  if (typeof error !== 'object') {
    return false;
  }

  const { errorCode, errorMessage } = error;
  return errorCode === 'string' && errorMessage === 'string';
};

export function makeErrorResponse(
  error: BaseError,
  errorMessage?: string
): ErrorResponse;
export function makeErrorResponse(
  error: Error,
  errorMessage?: string
): ErrorResponse;
export function makeErrorResponse(
  error: unknown,
  errorMessage?: string
): ErrorResponse {
  const message = errorMessage || '';

  if (error instanceof BaseError) {
    return { error: { errorCode: error.errorCode, errorMessage: message } };
  }
  if (error instanceof Error) {
    return {
      error: {
        errorCode: makeServerErrorCode('unhandled_error'),
        errorMessage: message,
      },
    };
  }
  return {
    error: {
      errorCode: makeServerErrorCode('unknown_error'),
      errorMessage: message,
    },
  };
}
