import { GraphQLEnumType } from 'graphql';
import {
  CARBOHYDRATE,
  PROTEIN,
  FAT,
  IRON,
  CALCIUM,
  MAGNESIUM,
  POTASSIUM,
  SODIUM,
  MANGANESE,
  ZINC,
  COPPER,
  IODINE,
  PHOSPHORUS,
  VITAMIN_D,
  VITAMIN_A,
  VITAMIN_E,
  VITAMIN_K,
  VITAMIN_B1,
  VITAMIN_B2,
  VITAMIN_B6,
  VITAMIN_B12,
  VITAMIN_C,
  NIACIN,
  PANTOTHENIC_ACID,
  FOLIC_ACID,
  BIOTIN,
} from '../../../domain/models/nutrient';

const values = {
  CARBOHYDRATE: {
    values: CARBOHYDRATE,
    description: CARBOHYDRATE,
  },
  PROTEIN: {
    values: PROTEIN,
    description: PROTEIN,
  },
  FAT: {
    values: FAT,
    description: FAT,
  },
  IRON: {
    values: IRON,
    description: IRON,
  },
  CALCIUM: {
    values: CALCIUM,
    description: CALCIUM,
  },
  MAGNESIUM: {
    values: MAGNESIUM,
    description: MAGNESIUM,
  },
  POTASSIUM: {
    values: POTASSIUM,
    description: POTASSIUM,
  },
  SODIUM: {
    values: SODIUM,
    description: SODIUM,
  },
  MANGANESE: {
    values: MANGANESE,
    description: MANGANESE,
  },
  ZINC: {
    values: ZINC,
    description: ZINC,
  },
  COPPER: {
    values: COPPER,
    description: COPPER,
  },
  IODINE: {
    values: IODINE,
    description: IODINE,
  },
  PHOSPHORUS: {
    values: PHOSPHORUS,
    description: PHOSPHORUS,
  },
  VITAMIN_A: {
    values: VITAMIN_A,
    description: VITAMIN_A,
  },
  VITAMIN_D: {
    values: VITAMIN_D,
    description: VITAMIN_D,
  },
  VITAMIN_E: {
    values: VITAMIN_E,
    description: VITAMIN_E,
  },
  VITAMIN_K: {
    values: VITAMIN_K,
    description: VITAMIN_K,
  },
  VITAMIN_B1: {
    values: VITAMIN_B1,
    description: VITAMIN_B1,
  },
  VITAMIN_B2: {
    values: VITAMIN_B2,
    description: VITAMIN_B2,
  },
  VITAMIN_B6: {
    values: VITAMIN_B6,
    description: VITAMIN_B6,
  },
  VITAMIN_B12: {
    values: VITAMIN_B12,
    description: VITAMIN_B12,
  },
  VITAMIN_C: {
    values: VITAMIN_C,
    description: VITAMIN_C,
  },
  NIACIN: {
    values: NIACIN,
    description: NIACIN,
  },
  PANTOTHENIC_ACID: {
    values: PANTOTHENIC_ACID,
    description: PANTOTHENIC_ACID,
  },
  FOLIC_ACID: {
    values: FOLIC_ACID,
    description: FOLIC_ACID,
  },
  BIOTIN: {
    values: BIOTIN,
    description: BIOTIN,
  },
};

const nutrientType = new GraphQLEnumType({
  name: 'Nutrient',
  description: '栄養素情報',
  values,
});

export default nutrientType;
