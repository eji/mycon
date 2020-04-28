import { Option, none, some } from "fp-ts/lib/Option";

export default class InMemoryStore<K, V> {
  readonly table: Map<K, V>;

  constructor(table?: Map<K, V>) {
    this.table = table || new Map<K, V>();
  }

  set(key: K, value: V): void {
    this.table.set(key, value);
  }

  get(key: K): Option<V> {
    const value = this.table.get(key);
    return typeof value === "undefined" ? none : some(value);
  }
}
