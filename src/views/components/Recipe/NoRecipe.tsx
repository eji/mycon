import React from 'react';
import { useHistory } from 'react-router-dom';
import { addRecipeScreenPath } from '../../../routePaths';
import NoItemView from '../NoItemView';

type NoRecipeProps = {};

const NoRecipe: React.FC<NoRecipeProps> = () => {
  const history = useHistory();

  const handleClick = (): void => {
    history.push(addRecipeScreenPath());
  };

  return (
    <NoItemView
      message="レシピがありません"
      buttonText="レシピを追加する"
      handleClick={handleClick}
    />
  );
};

export default NoRecipe;
