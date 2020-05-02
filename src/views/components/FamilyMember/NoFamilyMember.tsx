import React from 'react';
import { useHistory } from 'react-router-dom';
import NoItemView from '../NoItemView';
import { addFamilyMemberScreenPath } from '../../../routePaths';

type NoFamilyMemberProps = {};

const NoFamilyMember: React.FC<NoFamilyMemberProps> = () => {
  const history = useHistory();

  const path = addFamilyMemberScreenPath();
  const handleClick = (): void => {
    history.push(path);
  };

  return (
    <NoItemView
      message="家族が登録されてません"
      buttonText="家族を追加する"
      handleClick={handleClick}
    />
  );
};

export default NoFamilyMember;
