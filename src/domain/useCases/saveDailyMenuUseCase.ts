import { isLeft } from "fp-ts/lib/Either";
import RepositoryError from "../../errors/repositoryError";
import DailyMenu from "../models/dailyMenu";
import DailyMenuRepository from "../repositories/dailyMenuRepository";
import RecipeRepository from "../repositories/recipeRepository";

type InputPort = {
  dailyMenu: DailyMenu;
};

type OutputPort = {
  succeeded: (dailyMenu: DailyMenu) => void;
  failed: (error: RepositoryError) => void;
};

/**
 * 一日の献立を保存するユースケース
 */
export default class SaveDailyMenuUseCase {
  readonly dailyMenuRepository: DailyMenuRepository;

  readonly recipeRepository: RecipeRepository;

  constructor(
    dailyMenuRepository: DailyMenuRepository,
    recipeRepository: RecipeRepository
  ) {
    this.dailyMenuRepository = dailyMenuRepository;
    this.recipeRepository = recipeRepository;
  }

  async execute(params: {
    inputPort: InputPort;
    outputPort: OutputPort;
  }): Promise<void> {
    const { inputPort, outputPort } = params;
    const { dailyMenu } = inputPort;

    // 最初に全てのレシピを保存
    const saveResultOfRecipes = await this.recipeRepository.saveValues(
      dailyMenu.allRecipes()
    )();
    if (isLeft(saveResultOfRecipes)) {
      outputPort.failed(saveResultOfRecipes.left);
      return;
    }

    // 次に一日の献立を保存
    const saveResult = await this.dailyMenuRepository.saveValue(dailyMenu)();
    if (isLeft(saveResult)) {
      outputPort.failed(saveResult.left);
      return;
    }

    const result = await this.dailyMenuRepository.findByCalendarDate(
      dailyMenu.calendarDate
    )();
    if (isLeft(result)) {
      outputPort.failed(result.left);
      return;
    }

    outputPort.succeeded(result.right);
  }
}
