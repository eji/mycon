import gql from 'graphql-tag';
import recipeFields from './recipeFields';

const mealFields = gql`
  fragment MealFields on Meal {
    _id
    mealID
    name
    recipes {
      ...RecipeFields
    }
  }
  ${recipeFields}
`;

export default mealFields;
