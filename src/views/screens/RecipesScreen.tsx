import React, { useContext } from 'react';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import RecipesGridList from '../components/Recipe/RecipesGridList';
import NoRecipe from '../components/Recipe/NoRecipe';

type RecipesScreenProps = {};

const RecipesScreen: React.FC<RecipesScreenProps> = () => {
  const { appState } = useContext(appStateContext);
  const { allRecipes } = appState;
  const recipes = Object.values(allRecipes);

  return (
    <Layout title="レシピ一覧">
      {recipes.length === 0 ? (
        <NoRecipe />
      ) : (
        <RecipesGridList recipes={recipes} />
      )}
    </Layout>
  );
};

export default RecipesScreen;
