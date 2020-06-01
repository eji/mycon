import 'reflect-metadata';
import handleRequest from '../../src/api/handlers/handleRequest';
import handleReplaceFoodstuff from '../../src/api/handlers/foodstuffs/handleReplaceFoodstuff';
import initApi from '../../src/api/initApi';
import requireSignIn from '../../src/api/beforeActions/requireSingIn';

initApi();

export default handleRequest({
  /** 食材の更新 */
  put: { handler: handleReplaceFoodstuff, beforeActions: [requireSignIn] },
});
