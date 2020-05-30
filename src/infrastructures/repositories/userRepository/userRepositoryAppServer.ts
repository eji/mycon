import * as TE from 'fp-ts/lib/TaskEither';
import BaseError from '../../../errors/baseError';
import RestClient from '../../../drivers/restClient';
import UserRepository from '../../../domain/repositories/userRepository';
import User from '../../../domain/models/user';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';

export default class UserRepositoryAppServer implements UserRepository {
  constructor(readonly restClient: RestClient) {}

  getCurrentUser = (): TE.TaskEither<BaseError, User> =>
    /**
     * サーバー側では利用しない
     */
    TE.left(new NotFoundError());

  findByEmail = (): TE.TaskEither<BaseError, User> =>
    /**
     * サーバー側では利用しない
     */
    TE.left(new NotFoundError());

  create = (): TE.TaskEither<BaseError, User> =>
    /**
     * サーバー側では利用しない
     */
    TE.left(new NotFoundError());
}
