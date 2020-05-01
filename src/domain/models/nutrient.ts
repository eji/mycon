/**
 * 炭水化物
 */
export const CARBOHYDRATE = '糖質';

export type Carbohydrate = typeof CARBOHYDRATE;

export const CARBOHYDRATES: Carbohydrate[] = [CARBOHYDRATE];

/**
 * タンパク質
 */
export const PROTEIN = 'タンパク質';

export type Protein = typeof PROTEIN;

export const PROTEINS: Protein[] = [PROTEIN];

/**
 * 脂質
 */
export const FAT = '脂質';

export type Fat = typeof FAT;

export const FATS: Fat[] = [FAT];

/**
 * ミネラル
 */
export const IRON = '鉄';
export const CALCIUM = 'カルシウム';
export const MAGNESIUM = 'マグネシウム';
export const POTASSIUM = 'カリウム';
export const SODIUM = 'ナトリウム';
export const MANGANESE = 'マンガン';
export const ZINC = '亜鉛';
export const COPPER = '銅';
export const IODINE = 'ヨウ素';
export const PHOSPHORUS = 'リン';

export type Mineral =
  | typeof IRON
  | typeof CALCIUM
  | typeof MAGNESIUM
  | typeof POTASSIUM
  | typeof SODIUM
  | typeof MANGANESE
  | typeof ZINC
  | typeof COPPER
  | typeof IODINE
  | typeof PHOSPHORUS;

export const MINERALS: Mineral[] = [
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
];

/**
 * 脂溶性ビタミン
 */
export const VITAMIN_A = 'ビタミンA';
export const VITAMIN_D = 'ビタミンD';
export const VITAMIN_E = 'ビタミンE';
export const VITAMIN_K = 'ビタミンK';

export type FatSolubleVitamin =
  | typeof VITAMIN_A
  | typeof VITAMIN_D
  | typeof VITAMIN_E
  | typeof VITAMIN_K;

export const FAT_SOLUBLE_VITAMINS: FatSolubleVitamin[] = [
  VITAMIN_A,
  VITAMIN_D,
  VITAMIN_E,
  VITAMIN_K,
];

/**
 * 水溶性ビタミン
 */
export const VITAMIN_B1 = 'ビタミンB1';
export const VITAMIN_B2 = 'ビタミンB2';
export const VITAMIN_B6 = 'ビタミンB6';
export const VITAMIN_B12 = 'ビタミンB12';
export const VITAMIN_C = 'ビタミンC';
export const NIACIN = 'ナイアシン';
export const PANTOTHENIC_ACID = 'パントテン酸';
export const FOLIC_ACID = '葉酸';
export const BIOTIN = 'ビオチン';

export type WaterSolubleVitamin =
  | typeof VITAMIN_B1
  | typeof VITAMIN_B2
  | typeof VITAMIN_B6
  | typeof VITAMIN_B12
  | typeof VITAMIN_C
  | typeof NIACIN
  | typeof PANTOTHENIC_ACID
  | typeof FOLIC_ACID
  | typeof BIOTIN;

export const WATER_SOLUBLE_VITAMINS: WaterSolubleVitamin[] = [
  VITAMIN_B1,
  VITAMIN_B2,
  VITAMIN_B6,
  VITAMIN_B12,
  VITAMIN_C,
  NIACIN,
  PANTOTHENIC_ACID,
  FOLIC_ACID,
  BIOTIN,
];

/**
 * ビタミン
 */
export type Vitamin = FatSolubleVitamin | WaterSolubleVitamin;
export const VITAMINS = [...FAT_SOLUBLE_VITAMINS, WATER_SOLUBLE_VITAMINS];

/**
 * 栄養素
 */
type Nutrient = Carbohydrate | Protein | Fat | Mineral | Vitamin;

export default Nutrient;

/**
 * 全栄養素
 */
export const NUTRIENTS = [
  ...CARBOHYDRATES,
  ...PROTEINS,
  ...FATS,
  ...MINERALS,
  ...VITAMINS,
];
