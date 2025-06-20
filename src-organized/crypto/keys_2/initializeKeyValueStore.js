/**
 * Initializes a key-value store with separate internal data structures for different key types.
 *
 * This function sets up an object with three distinct storage mechanisms:
 * - 'hash': For storing non-string, non-object keys (typically primitives)
 * - 'string': For storing string keys
 * - 'map': For storing object keys, using either Rq or Lq as the backing map implementation
 *
 * @constructor
 * @example
 * const store = new initializeKeyValueStore();
 * store.size; // 0
 * store.__data__; // { hash: ..., string: ..., map: ... }
 */
function initializeKeyValueStore() {
  /**
   * The total number of key-value pairs in the store.
   * @type {number}
   */
  this.size = 0;

  /**
   * Internal data storage, separated by key type.
   * @type {{ hash: GE1, map: Lq|Rq, string: GE1 }}
   */
  this.__data__ = {
    // Used for storing non-string primitive keys (e.g., numbers, symbols)
    hash: new GE1(),
    // Used for storing object keys; Rq is preferred if available, otherwise Lq
    map: new (typeof Rq !== 'undefined' ? Rq : Lq)(),
    // Used for storing string keys
    string: new GE1()
  };
}

module.exports = initializeKeyValueStore;