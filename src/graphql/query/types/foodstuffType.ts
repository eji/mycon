import {
  GraphQLString,
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import foodstuffCategoryType from './foodstuffCategoryType';
import nutrientType from './nutrientType';

const foodstuffType = new GraphQLObjectType({
  name: 'Foodstuff',
  description: '食材の情報',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
      description: '食材ID',
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: '食材名',
    },
    nutrients: {
      type: GraphQLList(nutrientType),
      description: '含有栄養素一覧',
    },
    category: {
      type: GraphQLNonNull(foodstuffCategoryType),
      description: '食材カテゴリ',
    },
  }),
});

export default foodstuffType;
