import gql from 'graphql-tag';
import foodstuffFields from './foodstuffFields';

const recipeIngredientFields = gql`
  fragment RecipeIngredientFields on RecipeIngredient {
    _id
    foodstuff {
      ...FoodstuffFields
    }
    quantity
  }
  ${foodstuffFields}
`;

export default recipeIngredientFields;
