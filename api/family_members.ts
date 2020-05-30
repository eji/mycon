import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import handleCreateFamilyMember from '../src/api/handlers/familyMembers/handleCreateFamilyMember';
import handleGetFamilyMembers from '../src/api/handlers/familyMembers/handleGetFamilyMembers';
import initApi from '../src/api/initApi';

initApi();

export default handleRequest({
  /** 家族一覧の取得 */
  get: handleGetFamilyMembers,

  /** 食材の追加 */
  post: handleCreateFamilyMember,
});
