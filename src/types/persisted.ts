type Persisted<T extends { id?: string }> = Omit<T, 'id'> & { id: T['id'] };
export default Persisted;
