import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import handleCreateFamilyMember from '../src/api/handlers/familyMembers/handleCreateFamilyMember';
import handleGetFamilyMembers from '../src/api/handlers/familyMembers/handleGetFamilyMembers';
import initApi from '../src/api/initApi';
import requireSignIn from '../src/api/beforeActions/requireSingIn';

initApi();

export default handleRequest({
  /** 家族一覧の取得 */
  get: { handler: handleGetFamilyMembers, beforeActions: [requireSignIn] },

  /** 食材の追加 */
  post: { handler: handleCreateFamilyMember, beforeActions: [requireSignIn] },
});
