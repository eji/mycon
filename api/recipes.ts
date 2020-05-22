import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import diConfig from '../src/diConfig';
import handleGetRecipes from '../src/api/handlers/recipes/handleGetRecipes';
import handleCreateRecipe from '../src/api/handlers/recipes/handleCreateRecipe';

diConfig();

export default handleRequest({
  /** レシピ一覧の取得 */
  get: handleGetRecipes,
  /** レシピの追加 */
  post: handleCreateRecipe,
});
