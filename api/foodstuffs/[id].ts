import 'reflect-metadata';
import handleRequest from '../../src/api/handlers/handleRequest';
import handleReplaceFoodstuff from '../../src/api/handlers/foodstuffs/handleReplaceFoodstuff';
import initApi from '../../src/api/initApi';

initApi();

export default handleRequest({
  /** 食材の更新 */
  put: handleReplaceFoodstuff,
});
