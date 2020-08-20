import gql from 'graphql-tag';
import recipeIngredientFields from './recipeIngredientFields';

const recipeFields = gql`
  fragment RecipeFields on Recipe {
    _id
    recipeID
    name
    ingredients {
      data {
        ...RecipeIngredient
      }
    }
  }
  ${recipeIngredientFields}
`;

export default recipeFields;
