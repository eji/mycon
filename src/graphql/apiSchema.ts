import { GraphQLSchema } from 'graphql';
import queryType from './query/queryType';
import nutrientType from './query/types/nutrientType';
import foodstuffType from './query/types/foodstuffType';
import foodstuffCategoryType from './query/types/foodstuffCategoryType';

const apiSchema = new GraphQLSchema({
  query: queryType,
  types: [nutrientType, foodstuffType, foodstuffCategoryType],
});

export default apiSchema;
