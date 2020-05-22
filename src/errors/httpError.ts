import BaseError from './baseError';
import { makeServerErrorCode } from '../types/errorCode';

export default class HttpError extends BaseError {
  errorCode = makeServerErrorCode('http_error');

  constructor(readonly statusCode: number, params?: { message?: string }) {
    super(params?.message);
  }
}
