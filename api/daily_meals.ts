import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import diConfig from '../src/diConfig';
import handleGetDailyMeals from '../src/api/handlers/dailyMeals/handleGetDailyMeals';

diConfig();

export default handleRequest({
  /** 献立一覧の取得 */
  get: handleGetDailyMeals,
});
