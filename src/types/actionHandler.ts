import { Action } from "./action";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ActionHandler<S, A extends Action<any, any>> {
  (state: S, action: A): S;
}
