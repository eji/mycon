import { nanoid } from "nanoid";

/**
 * ID
 */
type ID = string;

export default ID;

/**
 * ID生成
 */
export const genId = (): string => nanoid();
