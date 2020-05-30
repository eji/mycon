import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import handleGetRecipes from '../src/api/handlers/recipes/handleGetRecipes';
import handleCreateRecipe from '../src/api/handlers/recipes/handleCreateRecipe';
import initApi from '../src/api/initApi';

initApi();

export default handleRequest({
  /** レシピ一覧の取得 */
  get: handleGetRecipes,
  /** レシピの追加 */
  post: handleCreateRecipe,
});
