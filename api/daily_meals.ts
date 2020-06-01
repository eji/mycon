import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import handleGetDailyMeals from '../src/api/handlers/dailyMeals/handleGetDailyMeals';
import initApi from '../src/api/initApi';
import requireSignIn from '../src/api/beforeActions/requireSingIn';

initApi();

export default handleRequest({
  /** 献立一覧の取得 */
  get: { handler: handleGetDailyMeals, beforeActions: [requireSignIn] },
});
