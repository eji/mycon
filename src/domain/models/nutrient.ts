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
export const MINERALS = [
  '鉄',
  'カルシウム',
  'マグネシウム',
  'カリウム',
  'ナトリウム',
  'マンガン',
  '亜鉛',
  '銅',
  'ヨウ素',
  'リン',
] as const;

type Mineral = typeof MINERALS[number];

/**
 * 脂溶性ビタミン
 */
export const FAT_SOLUBLE_VITAMINS = [
  'ビタミンA',
  'ビタミンD',
  'ビタミンE',
  'ビタミンK',
] as const;

export type FatSolubleVitamin = typeof FAT_SOLUBLE_VITAMINS[number];

/**
 * 水溶性ビタミン
 */
export const WATER_SOLUBLE_VITAMINS = [
  'ビタミンB1',
  'ビタミンB2',
  'ビタミンB6',
  'ビタミンB12',
  'ビタミンC',
  'ナイアシン',
  'パントテン酸',
  '葉酸',
  'ビオチン',
] as const;

export type WaterSolubleVitamin = typeof WATER_SOLUBLE_VITAMINS[number];

/**
 * ビタミン
 */
export const VITAMINS = [
  ...FAT_SOLUBLE_VITAMINS,
  ...WATER_SOLUBLE_VITAMINS,
] as const;

export type Vitamin = typeof VITAMINS[number];

/**
 * 全栄養素
 */
export const NUTRIENTS = [
  ...CARBOHYDRATES,
  ...PROTEINS,
  ...FATS,
  ...MINERALS,
  ...VITAMINS,
] as const;

type Nutrient = Carbohydrate | Protein | Fat | Mineral | Vitamin;

export default Nutrient;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNutrient = (value: any): value is Nutrient =>
  NUTRIENTS.includes(value);
