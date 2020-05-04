import { pipe } from 'fp-ts/lib/pipeable';
import * as A from 'fp-ts/lib/Array';
import { Foodstuff, makeFoodstuff } from '../../domain/models/foodstuff';
import {
  MINERALS,
  VITAMINS,
  VITAMIN_C,
  PROTEIN,
  FAT,
  CARBOHYDRATE,
} from '../../domain/models/nutrient';

const foodstuffSeeds: Foodstuff[] = pipe(
  [
    { name: 'ごはん', nutrients: ['糖質'], category: '穀類・いも類' },
    {
      name: 'たまご',
      nutrients: [
        PROTEIN,
        FAT,
        ...MINERALS,
        ...VITAMINS.filter((v) => v !== VITAMIN_C),
      ],
      category: '卵・肉・魚介',
    },
    {
      name: '牛乳',
      nutrients: [
        CARBOHYDRATE,
        PROTEIN,
        FAT,
        ...MINERALS,
        ...VITAMINS.filter((v) => v !== VITAMIN_C),
      ],
      category: '乳製品',
    },
  ],
  A.map(makeFoodstuff)
);

export default foodstuffSeeds;
