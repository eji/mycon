import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import handleCreateSignedIn from '../src/api/handlers/signedIn/handleCreateSignedIn';
import initApi from '../src/api/initApi';

initApi();

export default handleRequest({
  /** サインイン後の処理 */
  post: { handler: handleCreateSignedIn },
});
