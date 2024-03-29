import React from 'react';
import { useHistory } from 'react-router-dom';
import NoItemView from '../NoItemView';
import { addFoodstuffScreenPath } from '../../../routePaths';

type NoRecipeProps = {};

const NoRecipe: React.FC<NoRecipeProps> = () => {
  const history = useHistory();

  const path = addFoodstuffScreenPath();
  const handleClick = (): void => {
    history.push(path);
  };

  return (
    <NoItemView
      message="食材がありません"
      buttonText="食材を追加する"
      handleClick={handleClick}
    />
  );
};

export default NoRecipe;
