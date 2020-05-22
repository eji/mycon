import 'reflect-metadata';
import handleRequest from '../src/api/handlers/handleRequest';
import diConfig from '../src/diConfig';
import handleCreateFamilyMember from '../src/api/handlers/familyMembers/handleCreateFamilyMember';
import handleGetFamilyMembers from '../src/api/handlers/familyMembers/handleGetFamilyMembers';

diConfig();

export default handleRequest({
  /** 家族一覧の取得 */
  get: handleGetFamilyMembers,

  /** 食材の追加 */
  post: handleCreateFamilyMember,
});
