const inspect = <T>(f: (value: T) => unknown): ((value: T) => T) => (
  value: T
): T => {
  f(value);
  return value;
};

export default inspect;
