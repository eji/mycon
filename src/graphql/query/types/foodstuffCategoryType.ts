import { GraphQLEnumType } from 'graphql';

const values = {
  GRAINS_POTATOES: {
    value: '穀類・いも類',
    description: '穀類・いも類',
  },
  EGGS_MEATS_FISHS: {
    value: '卵・肉・魚介',
    description: '卵・肉・魚介',
  },
  DAIRY_PRODUCTS: {
    value: '乳製品',
    description: '乳製品',
  },
  SOY_PRODUCTS: {
    value: '大豆製品',
    description: '大豆製品',
  },
  GREEN_AND_YELLOW_VEGETABLES: {
    value: '緑黄色野菜',
    description: '緑黄色野菜',
  },
  LIGHT_VEGETABLES: {
    value: '淡色野菜',
    description: '淡色野菜',
  },
  FRUITS: {
    value: '果物',
    description: '果物',
  },
  OTHERS: {
    value: 'その他',
    description: 'その他',
  },
};

const foodstuffCategoryType = new GraphQLEnumType({
  name: 'FoodstuffCategory',
  description: '食材のカテゴリ',
  values,
});

export default foodstuffCategoryType;
