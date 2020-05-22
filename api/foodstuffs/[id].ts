import 'reflect-metadata';
import handleRequest from '../../src/api/handlers/handleRequest';
import handleReplaceFoodstuff from '../../src/api/handlers/foodstuffs/handleReplaceFoodstuff';

export default handleRequest({
  /** 食材の更新 */
  put: handleReplaceFoodstuff,
});
