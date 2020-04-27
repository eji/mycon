import { isLeft } from "fp-ts/es6/Either";
import RepositoryError from "../../errors/repositoryError";
import RecipesOfTheDay from "../models/recipesOfTheDay";
import RecipesOfTheDayRepository from "../repositories/recipesOfTheDayRepository";
import RecipeRepository from "../repositories/recipeRepository";

type InputPort = {
  recipesOfTheDay: RecipesOfTheDay;
};

type OutputPort = {
  succeeded: (recipesOfTheDay: RecipesOfTheDay) => void;
  failed: (error: RepositoryError) => void;
};

/**
 * 一日の献立を保存するユースケース
 */
export default class SaveRecipesOfTheDayUseCase {
  readonly recipesOfTheDayRepository: RecipesOfTheDayRepository;

  readonly recipeRepository: RecipeRepository;

  constructor(
    recipesOfTheDayRepository: RecipesOfTheDayRepository,
    recipeRepository: RecipeRepository
  ) {
    this.recipesOfTheDayRepository = recipesOfTheDayRepository;
    this.recipeRepository = recipeRepository;
  }

  async execute(params: {
    inputPort: InputPort;
    outputPort: OutputPort;
  }): Promise<void> {
    const { inputPort, outputPort } = params;
    const { recipesOfTheDay } = inputPort;

    // 最初に全てのレシピを保存
    const saveResultOfRecipes = await this.recipeRepository.saveValues(
      recipesOfTheDay.allRecipes()
    )();
    if (isLeft(saveResultOfRecipes)) {
      outputPort.failed(saveResultOfRecipes.left);
      return;
    }

    // 次に一日の献立を保存
    const saveResult = await this.recipesOfTheDayRepository.save(
      recipesOfTheDay
    )();
    if (isLeft(saveResult)) {
      outputPort.failed(saveResult.left);
      return;
    }

    const result = await this.recipesOfTheDayRepository.findByDate(
      recipesOfTheDay.date
    )();
    if (isLeft(result)) {
      outputPort.failed(result.left);
      return;
    }

    outputPort.succeeded(result.right);
  }
}
