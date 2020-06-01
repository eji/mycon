import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import handleGetFoodAllergyHistories from '../src/api/handlers/foodAllergyHistories/handleGetFoodAllergyHistories';
import handleCreateFoodAllergyHistory from '../src/api/handlers/foodAllergyHistories/handleCreateFoodAllergyHistory';
import initApi from '../src/api/initApi';
import requireSignIn from '../src/api/beforeActions/requireSingIn';

initApi();

export default handleRequest({
  /** 食物アレルギー履歴一覧の取得 */
  get: {
    handler: handleGetFoodAllergyHistories,
    beforeActions: [requireSignIn],
  },

  /** 食物アレルギー履歴の追加 */
  post: {
    handler: handleCreateFoodAllergyHistory,
    beforeActions: [requireSignIn],
  },
});
