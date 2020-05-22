import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import diConfig from '../src/diConfig';
import handleGetFoodAllergyHistories from '../src/api/handlers/foodAllergyHistories/handleGetFoodAllergyHistories';
import handleCreateFoodAllergyHistory from '../src/api/handlers/foodAllergyHistories/handleCreateFoodAllergyHistory';

diConfig();

export default handleRequest({
  /** 食物アレルギー履歴一覧の取得 */
  get: handleGetFoodAllergyHistories,

  /** 食物アレルギー履歴の追加 */
  post: handleCreateFoodAllergyHistory,
});
