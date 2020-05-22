type Unpersisted<T extends { id: string }> = Omit<T, 'id'> & { id?: T['id'] };
export default Unpersisted;

export const isPersisted = <T>(value: any): value is T => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string'
  );
};
