import UserRepository from '../repositories/userRepository';

/**
 * 現在のユーザーを取得するためのユースケース
 */
export default class GetCurrentUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  execute = this.userRepository.getCurrentUser;
}
