import React, { useContext } from 'react';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import NoFamilyMember from '../components/FamilyMember/NoFamilyMember';
import FamilyMemberList from '../components/FamilyMember/FamilyMemberList';

type FamilyMembersScreenProps = {};

const FamilyMembersScreen: React.FC<FamilyMembersScreenProps> = () => {
  const { appState } = useContext(appStateContext);
  const { allFamilyMembers } = appState;
  const familyMembers = Object.values(allFamilyMembers);

  return (
    <Layout title="家族一覧">
      {familyMembers.length === 0 ? (
        <NoFamilyMember />
      ) : (
        <FamilyMemberList familyMembers={familyMembers} />
      )}
    </Layout>
  );
};

export default FamilyMembersScreen;
