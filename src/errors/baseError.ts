import ErrorCode from '../types/errorCode';

export default abstract class BaseError extends Error {
  abstract readonly errorCode: ErrorCode;
}
