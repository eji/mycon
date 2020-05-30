import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import * as jwt from 'jsonwebtoken';
import { RestClient, IRestResponse } from 'typed-rest-client';
import { pipe } from 'fp-ts/lib/pipeable';
import base64url from 'base64-url';
import BaseError from '../errors/baseError';
import NotFoundError from '../errors/repositoryErrors/queryErrors/notFoundError';
import { firebaseProjectId, firebaseIdTokenIssuer } from '../firebaseConfig';

/** 公開鍵情報 */

type PublicKeyInfo = {
  keyId: string;
  key: string;
  expirationTime: number;
};

type PublicKeyInfos = PublicKeyInfo[];

const publicKeysUrl =
  'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

/**
 * Friebase IDトークンのヘッダー
 */
type FirebaseIdTokenHeader = {
  alg: 'RS256';
  kid: string;
};

const publicKeyInfosCache: { publicKeys: PublicKeyInfos } = {
  publicKeys: [],
};

const isNotExpired = (keyInfo: PublicKeyInfo): boolean =>
  keyInfo.expirationTime > Date.now();

const filterNotExpired = A.filter(isNotExpired);

const addKeysToCache = (keys: PublicKeyInfos): PublicKeyInfos => {
  publicKeyInfosCache.publicKeys = filterNotExpired([
    ...publicKeyInfosCache.publicKeys,
    ...keys,
  ]);
  return publicKeyInfosCache.publicKeys;
};

const restClient = new RestClient('typed-rest-client', publicKeysUrl);

const cacheControlHeaderRegExp = /^max-age=(\d+)$/;

const getExpirationTimeFromHeader = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: Record<string, any>
): E.Either<BaseError, number> => {
  if ('Cache-Control' in headers) {
    const cacheControl = headers['Cache-Control'] as string | undefined;
    if (typeof cacheControl === 'undefined') {
      return E.left(new NotFoundError());
    }
    const match = cacheControl.match(cacheControlHeaderRegExp);
    if (match === null) {
      return E.left(new NotFoundError());
    }
    const maxAge = Number.parseInt(match[1], 10);
    const expirationTime = Date.now() + maxAge;
    return E.right(expirationTime);
  }
  return E.left(new NotFoundError());
};

type PublicKeyApiResponseType = { [keyId: string]: string };

const getHeadersAndResponseResult = (
  response: IRestResponse<PublicKeyApiResponseType>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): E.Either<BaseError, [Record<string, any>, PublicKeyApiResponseType]> =>
  response.result === null
    ? E.left(new NotFoundError())
    : E.right([response.headers, response.result]);

/**
 * 公開鍵をFirebaseから取得する
 */
const fetchPublicKeys = (): TE.TaskEither<BaseError, PublicKeyInfos> =>
  pipe(
    TE.tryCatch(
      () => restClient.get<PublicKeyApiResponseType>('/'),
      () => new NotFoundError()
    ),
    TE.chainEitherK(getHeadersAndResponseResult),
    TE.chainEitherK(([headers, result]) =>
      pipe(
        getExpirationTimeFromHeader(headers),
        E.map((expirationTime) => {
          return Object.keys(result).map((keyId) => ({
            keyId,
            key: result[keyId],
            expirationTime,
          }));
        })
      )
    )
  );

const removeExpiredKeysFromCache = (): void => {
  publicKeyInfosCache.publicKeys = filterNotExpired(
    publicKeyInfosCache.publicKeys
  );
};

const findPublicKeyFromCache = (keyId: string): E.Either<BaseError, string> => {
  removeExpiredKeysFromCache();

  const key =
    publicKeyInfosCache.publicKeys.find((keyInfo) => keyInfo.keyId === keyId)
      ?.key || null;
  return E.fromNullable(new NotFoundError())(key);
};

const findPublicKey = (keyId: string): TE.TaskEither<BaseError, string> =>
  pipe(
    TE.fromEither(findPublicKeyFromCache(keyId)),
    TE.orElse(() =>
      pipe(
        fetchPublicKeys(),
        TE.map(addKeysToCache),
        TE.chainEitherK(() => findPublicKeyFromCache(keyId))
      )
    )
  );

/**
 * Friebase IDトークンのペイロード
 */
type FirebaseIdTokenPayload = {
  /** 有効期限 */
  exp: number;
  /** 発行時 */
  iat: number;
  /** 対象 */
  aud: string;
  /** 発行元 */
  iss: string;
  /** 件名 */
  sub: string;
  /** 認証時間 */
  auth_time: number;
  /** メールアドレス */
  email?: string;
};

const isFirebaseIdTokenHeader = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FirebaseIdTokenHeader => {
  if (value != null && typeof value === 'object') {
    return value.alg === 'RS256' && typeof value.kid === 'string';
  }
  return false;
};

const isFirebaseIdTokenPayload = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FirebaseIdTokenPayload => {
  if (value != null && typeof value === 'object') {
    return (
      typeof value.exp === 'number' &&
      typeof value.iat === 'number' &&
      typeof value.aud === 'string' &&
      typeof value.iss === 'string' &&
      typeof value.sub === 'string' &&
      typeof value.auth_time === 'string' &&
      typeof value.email === 'string'
    );
  }
  return false;
};

const separateIdToken = (
  idToken: string
): E.Either<BaseError, [FirebaseIdTokenHeader, FirebaseIdTokenPayload]> => {
  const [header, payload] = idToken.split('.');
  if (typeof header === 'undefined' || typeof payload === 'undefined') {
    // TODO: 直すこと
    return E.left(new NotFoundError());
  }

  const decodedHeader = base64url.decode(header);
  const decodedPayload = base64url.decode(payload);

  if (
    !isFirebaseIdTokenHeader(decodedHeader) ||
    !isFirebaseIdTokenPayload(decodedPayload)
  ) {
    return E.left(new NotFoundError());
  }
  return E.right([decodedHeader, decodedPayload]);
};

const verifyIdTokenWithCertKey = (
  idToken: string,
  cert: string
): E.Either<BaseError, unknown> =>
  E.tryCatch(
    () => jwt.verify(idToken, cert),
    () => new NotFoundError()
  );

const verifyIdTokenPayload = (payload: FirebaseIdTokenPayload): boolean => {
  const now = Date.now();
  return (
    payload.aud === firebaseProjectId &&
    payload.iss === firebaseIdTokenIssuer &&
    // 有効期限が未来
    payload.exp > now &&
    // 発行時間が過去
    payload.iat < now &&
    // 認証時間が過去
    payload.auth_time < now
  );
};

const verifyIdToken = (
  idToken: string
): TE.TaskEither<BaseError, FirebaseIdTokenPayload> =>
  pipe(
    TE.fromEither(separateIdToken(idToken)),
    TE.chain(([header, payload]) =>
      pipe(
        findPublicKey(header.kid),
        TE.chainEitherK((cert) => verifyIdTokenWithCertKey(idToken, cert)),
        TE.map(() => payload)
      )
    ),
    TE.filterOrElse(verifyIdTokenPayload, () => new NotFoundError())
  );

const verifyIdTokenAndGetEmail = (
  idToken: string
): TE.TaskEither<BaseError, string> =>
  pipe(
    verifyIdToken(idToken),
    TE.chain((payload) => {
      if (typeof payload.email === 'undefined') {
        // TODO: 直すこと
        return TE.left(new NotFoundError());
      }
      return TE.right(payload.email);
    })
  );

export type FirebaseIdTokenUtil = {
  readonly verifyIdTokenAndGetEmail: typeof verifyIdTokenAndGetEmail;
};

const firebaseIdTokenUtil: FirebaseIdTokenUtil = {
  verifyIdTokenAndGetEmail,
};

export default firebaseIdTokenUtil;
