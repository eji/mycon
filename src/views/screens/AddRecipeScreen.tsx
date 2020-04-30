import React, { useContext } from 'react';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import RecipesList from '../components/Recipe/RecipesList';
import NoRecipe from '../components/Recipe/NoRecipe';

type AddRecipeScreenProps = {};

const AddRecipeScreen: React.FC<AddRecipeScreenProps> = () => {
  const { appState } = useContext(appStateContext);
  const { allRecipes } = appState;
  const recipes = Object.values(allRecipes);

  return (
    <Layout title="レシピの追加">
      {recipes.length === 0 ? <NoRecipe /> : <RecipesList recipes={recipes} />}
    </Layout>
  );
};

export default AddRecipeScreen;
