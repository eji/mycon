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
    { name: 'ごはん', nutrients: ['糖質'] },
    {
      name: 'たまご',
      nutrients: [
        PROTEIN,
        FAT,
        ...MINERALS,
        ...VITAMINS.filter((v) => v !== VITAMIN_C),
      ],
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
    },
  ],
  A.map(makeFoodstuff)
);

export default foodstuffSeeds;
