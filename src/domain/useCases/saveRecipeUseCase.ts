import { isLeft } from "fp-ts/es6/Either";
import RecipeRepository from "../repositories/recipeRepository";
import Recipe from "../models/recipe";
import RepositoryError from "../../errors/repositoryError";

type InputPort = {
  recipe: Recipe;
};

type OutputPort = {
  succeeded: (recipe: Recipe) => void;
  failed: (error: RepositoryError) => void;
};

/**
 * レシピを保存するためのユースケース
 */
export default class SaveRecipeUseCase {
  readonly recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(params: {
    inputPort: InputPort;
    outputPort: OutputPort;
  }): Promise<void> {
    const { inputPort, outputPort } = params;
    const { recipe } = inputPort;
    const recipeId = recipe.id;
    const saveResult = await this.recipeRepository.saveValue(recipe)();
    if (isLeft(saveResult)) {
      outputPort.failed(saveResult.left);
      return;
    }

    const result = await this.recipeRepository.findById(recipeId)();
    if (isLeft(result)) {
      outputPort.failed(result.left);
      return;
    }

    outputPort.succeeded(result.right);
  }
}
