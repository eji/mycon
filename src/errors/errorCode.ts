/** リポジトリ系エラーコード */

const repositoryErrorCodes = [
  /** 保存に失敗 */
  'repos/failed_to_save',
  /** 見つけられなかった */
  'repos/not_found_error',
] as const;

export type RepositoryErrorCode = typeof repositoryErrorCodes[number];

/** HTTPリクエスト: サーバーエラーコード */

const httpRequestServerErrorCodes = [
  'http_req/invalid_response_error',
  /** 未実装エラー */
  'http_req/not_implemented_error',
  /** レスポンスボディが空 */
  'http_req/empty_response_body_received',
  'http_req/error_received',
] as const;

export type HttpRequestServerErrorCode = typeof httpRequestServerErrorCodes[number];

/** HTTPリクエスト: クライアントエラーコード */
const httpRequestClientErrorCodes = [
  /** 不正なリクエストを送信した */
  'http_req/invalid_request_error',
  /** 404エラー */
  'http_req/404_error',
] as const;

export type HttpRequestClientErrorCode = typeof httpRequestClientErrorCodes[number];

const httpRequestErrorCodes = [
  ...httpRequestClientErrorCodes,
  ...httpRequestServerErrorCodes,
] as const;

export type HttpRequestErrorCode = typeof httpRequestErrorCodes[number];

const authErrorCodes = ['auth/require_sign_in', 'auth/failed_sign_in'] as const;

export type AuthErrorCode = typeof authErrorCodes[number];

const unhandledErrors = ['unhandled_error'] as const;

export type UnhandledError = typeof unhandledErrors[number];

const unknownErrors = ['unknown_error'] as const;

export type UnknownError = typeof unknownErrors[number];

const firebaseErrorCodes = [
  'firebase/no_cache_control',
  'firebase/invalid_cache_control',
  'firebase/failed_to_fetch_public_keys',
  'firebase/no_public_keys',
  'firebase/public_key_not_found_error',
  'firebase/invalid_id_token_structure',
  'firebase/invalid_id_token_header',
  'firebase/invalid_id_token_payload',
  'firebase/failed_to_verify_id_token',
  'firebase/failed_to_verify_id_token_payload',
  'firebase/email_not_found_in_id_token_error',
  'firebase/user_not_exists_in_user_credential',
  'firebase/failed_to_get_id_token',
] as const;

export type FirebaseErrorCode = typeof firebaseErrorCodes[number];

const userContextErrorCodes = [
  'user_context/firebase_user_not_exists',
] as const;

export type UserContextErrorCode = typeof userContextErrorCodes[number];

const errorCodes = [
  ...unknownErrors,
  ...unhandledErrors,
  ...repositoryErrorCodes,
  ...httpRequestErrorCodes,
  ...authErrorCodes,
  ...firebaseErrorCodes,
  ...userContextErrorCodes,
] as const;

type ErrorCode = typeof errorCodes[number];

export default ErrorCode;

export const isErrorCode = (value: string): value is ErrorCode => {
  return (errorCodes as ReadonlyArray<string>).includes(value);
};
