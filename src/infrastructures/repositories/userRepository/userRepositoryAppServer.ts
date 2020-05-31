import * as TE from 'fp-ts/lib/TaskEither';
import RestClient from '../../../drivers/restClient';
import UserRepository from '../../../domain/repositories/userRepository';
import User from '../../../domain/models/user';
import AppError from '../../../errors/AppError';

export default class UserRepositoryAppServer implements UserRepository {
  constructor(readonly restClient: RestClient) {}

  getCurrentUser = (): TE.TaskEither<AppError, User> => {
    /**
     * サーバー側では利用しない
     */
    throw new Error('サーバー側では利用しない');
  };

  findByEmail = (): TE.TaskEither<AppError, User> => {
    /**
     * サーバー側では利用しない
     */
    throw new Error('サーバー側では利用しない');
  };

  create = (): TE.TaskEither<AppError, User> => {
    /**
     * サーバー側では利用しない
     */
    throw new Error('サーバー側では利用しない');
  };
}
