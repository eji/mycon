import gql from 'graphql-tag';

const foodstuffFields = gql`
  fragment FoodstuffFields on Foodstuff {
    _id
    foodstuffID
    name
    nutrients
    category
  }
`;

export default foodstuffFields;
