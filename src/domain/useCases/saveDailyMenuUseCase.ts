import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import DailyMenu from '../models/dailyMenu';
import DailyMenuRepository from '../repositories/dailyMenuRepository';
import CommandError from '../../errors/repositoryErrors/commandError';

type Params = {
  dailyMenu: DailyMenu;
};

/**
 * 一日の献立を保存するユースケース
 */
export default class SaveDailyMenuUseCase {
  constructor(readonly dailyMenuRepository: DailyMenuRepository) {}

  execute = (params: Params): TE.TaskEither<CommandError, DailyMenu> =>
    pipe(
      this.dailyMenuRepository.saveValue(params.dailyMenu),
      TE.map(() => params.dailyMenu)
    );
}
