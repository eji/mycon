import gql from 'graphql-tag';
import mealFields from './mealFields';

const dailyMealFields = gql`
  fragment DailyMealFields on Recipe {
    _id
    dailyMealID
    breakfast {
      ...MealFields
    }
    lunch {
      ...MealFields
    }
    dinner {
      ...MealFields
    }
    snack {
      ...MealFields
    }
  }
  ${mealFields}
`;

export default dailyMealFields;
