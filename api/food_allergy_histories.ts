import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import handleGetFoodAllergyHistories from '../src/api/handlers/foodAllergyHistories/handleGetFoodAllergyHistories';
import handleCreateFoodAllergyHistory from '../src/api/handlers/foodAllergyHistories/handleCreateFoodAllergyHistory';
import initApi from '../src/api/initApi';

initApi();

export default handleRequest({
  /** 食物アレルギー履歴一覧の取得 */
  get: handleGetFoodAllergyHistories,

  /** 食物アレルギー履歴の追加 */
  post: handleCreateFoodAllergyHistory,
});
