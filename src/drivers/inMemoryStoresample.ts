import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

export default class InMemoryStore<K, V> {
  readonly table: Map<K, V>;

  constructor(table?: Map<K, V>) {
    this.table = table || new Map<K, V>();
  }

  set = (key: K, value: V): unknown => this.table.set(key, value);

  get = (key: K): O.Option<V> => pipe(this.table.get(key), O.fromNullable);

  values = (): V[] => Array.from(this.table.values());
}
