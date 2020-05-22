import 'reflect-metadata';
import handleGetFoodstuffs from '../src/api/handlers/foodstuffs/handleGetFoodstuffs';
import handleRequest from '../src/api/handlers/handleRequest';
import handleCreateFoodstuff from '../src/api/handlers/foodstuffs/handleCreateFoodstuff';
import diConfig from '../src/diConfig';

diConfig();

export default handleRequest({
  /** 食材一覧の取得 */
  get: handleGetFoodstuffs,

  /** 食材の追加 */
  post: handleCreateFoodstuff,
});
