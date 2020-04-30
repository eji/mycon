/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '../types/action';

export default function createActionDistinguishFunction<S>(msgs: {
  includes: (obj: any) => boolean;
}) {
  return (value: Action<any, any>): value is S => {
    return msgs.includes(value.type);
  };
}
