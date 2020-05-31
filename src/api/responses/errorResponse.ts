import ErrorCode from '../../errors/errorCode';
import AppError from '../../errors/AppError';

type ErrorResponseValue = {
  errorCode: ErrorCode;
  errorMessage: string;
};

type ErrorResponse = {
  error: ErrorResponseValue;
};

export default ErrorResponse;

export const isErrorResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is ErrorResponseValue => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  return (
    typeof value.errorCode === 'string' &&
    typeof value.errorMessage === 'string'
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isErrorResponse = (value: any): value is ErrorResponse => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  return isErrorResponseValue(value.error);
};

export function makeErrorResponse(
  error: AppError,
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

  if (error instanceof AppError) {
    return { error: { errorCode: error.errorCode, errorMessage: message } };
  }
  if (error instanceof Error) {
    return {
      error: {
        errorCode: 'unhandled_error',
        errorMessage: message,
      },
    };
  }
  return {
    error: {
      errorCode: 'unknown_error',
      errorMessage: message,
    },
  };
}
