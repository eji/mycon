/** リポジトリ系エラーコード */

type RepositoryErrorCode =
  /** 保存に失敗 */
  | 'repos/failed_to_save'
  /** 見つけられなかった */
  | 'repos/not_found_error';

/** HTTPリクエスト系エラーコード */

type HttpRequestServerErrorCode =
  | 'http_req/invalid_response_error'
  /** 未実装エラー */
  | 'http_req/not_implemented_error'
  /** レスポンスボディが空 */
  | 'http_req/empty_response_body_received'
  | 'http_req/error_received';

type HttpRequestClientErrorCode =
  /** 不正なリクエストを送信した */
  | 'http_req/invalid_request_error'
  /** 404エラー */
  | 'http_req/404_error';

type HttpRequestErrorCode =
  | HttpRequestClientErrorCode
  | HttpRequestServerErrorCode;

type AuthErrorCode = 'auth/require_sign_in' | 'auth/failed_sign_in';

type UnhandledError = 'unhandled_error';

type UnknownError = 'unknown_error';

type FirebaseErrorCode =
  | 'firebase/no_cache_control'
  | 'firebase/invalid_cache_control'
  | 'firebase/failed_to_fetch_public_keys'
  | 'firebase/no_public_keys'
  | 'firebase/public_key_not_found_error'
  | 'firebase/invalid_id_token_structure'
  | 'firebase/invalid_id_token_header'
  | 'firebase/invalid_id_token_payload'
  | 'firebase/failed_to_verify_id_token'
  | 'firebase/failed_to_verify_id_token_payload'
  | 'firebase/email_not_found_in_id_token_error'
  | 'firebase/user_not_exists_in_user_credential'
  | 'firebase/failed_to_get_id_token';

type UserContextErrorCode = 'user_context/firebase_user_not_exists';

type ErrorCode =
  | UnknownError
  | UnhandledError
  | RepositoryErrorCode
  | HttpRequestErrorCode
  | AuthErrorCode
  | FirebaseErrorCode
  | UserContextErrorCode;

export default ErrorCode;
