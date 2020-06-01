import 'reflect-metadata';
import handleGetFoodstuffs from '../src/api/handlers/foodstuffs/handleGetFoodstuffs';
import handleRequest from '../src/api/handlers/handleRequest';
import handleCreateFoodstuff from '../src/api/handlers/foodstuffs/handleCreateFoodstuff';
import initApi from '../src/api/initApi';
import requireSignIn from '../src/api/beforeActions/requireSingIn';

initApi();

export default handleRequest({
  /** 食材一覧の取得 */
  get: { handler: handleGetFoodstuffs, beforeActions: [requireSignIn] },

  /** 食材の追加 */
  post: { handler: handleCreateFoodstuff, beforeActions: [requireSignIn] },
});
