import {
  makeFoodstuff,
  UnpersistedFoodstuff,
} from '../../domain/models/foodstuff';
import {
  MINERALS,
  VITAMINS,
  VITAMIN_C,
  PROTEIN,
  FAT,
  CARBOHYDRATE,
} from '../../domain/models/nutrient';

const foodstuffSeeds: UnpersistedFoodstuff[] = [
  makeFoodstuff({
    name: 'ごはん',
    nutrients: ['糖質'],
    category: '穀類・いも類',
  }),
  makeFoodstuff({
    name: 'たまご',
    nutrients: [
      PROTEIN,
      FAT,
      ...MINERALS,
      ...VITAMINS.filter((v) => v !== VITAMIN_C),
    ],
    category: '卵・肉・魚介',
  }),
  makeFoodstuff({
    name: '牛乳',
    nutrients: [
      CARBOHYDRATE,
      PROTEIN,
      FAT,
      ...MINERALS,
      ...VITAMINS.filter((v) => v !== VITAMIN_C),
    ],
    category: '乳製品',
  }),
];

export default foodstuffSeeds;
