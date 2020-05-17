import { GraphQLObjectType } from 'graphql';
import foodstuffsField from './fields/foodstuffsField';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...foodstuffsField,
  }),
});

export default queryType;
