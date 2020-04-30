/**
 * 糖質
 */
type Carbs = '糖質';

/**
 * タンパク質
 */
type Protein = 'タンパク質';
/**
 * 脂質
 */
export type Fat = '脂質';

export type Mineral =
  | '鉄'
  | 'カルシウム'
  | 'マグネシウム'
  | 'カリウム'
  | 'ナトリウム'
  | 'マンガン'
  | '亜鉛'
  | '銅'
  | 'ヨウ素'
  | 'リン';

/**
 * 脂溶性ビタミン
 */
export type FatSolubleVitamin =
  | 'ビタミンA'
  | 'ビタミンD'
  | 'ビタミンE'
  | 'ビタミンK';

/**
 * 水溶性ビタミン
 */
export type WaterSolubleVitamin =
  | 'ビタミンB1'
  | 'ビタミンB2'
  | 'ビタミンB6'
  | 'ビタミンB12'
  | 'ビタミンC'
  | 'ナイアシン'
  | 'パントテン酸'
  | '葉酸'
  | 'ビオチン';

/**
 * ビタミン
 */
export type Vitamin = FatSolubleVitamin | WaterSolubleVitamin;

type Nutrient = Carbs | Protein | Fat | Mineral | Vitamin;

export default Nutrient;
