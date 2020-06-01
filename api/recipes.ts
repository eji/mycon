import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import handleGetRecipes from '../src/api/handlers/recipes/handleGetRecipes';
import handleCreateRecipe from '../src/api/handlers/recipes/handleCreateRecipe';
import initApi from '../src/api/initApi';
import requireSignIn from '../src/api/beforeActions/requireSingIn';

initApi();

export default handleRequest({
  /** レシピ一覧の取得 */
  get: { handler: handleGetRecipes, beforeActions: [requireSignIn] },
  /** レシピの追加 */
  post: { handler: handleCreateRecipe, beforeActions: [requireSignIn] },
});
