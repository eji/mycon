export type Action<S extends string, P> = {
  type: S;
} & P;
