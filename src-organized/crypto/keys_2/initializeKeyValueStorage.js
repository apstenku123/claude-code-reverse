/**
 * Initializes a key-value storage object with separate internal storage for hash, string, and map keys.
 *
 * This function is intended to be used as a constructor for a key-value storage class.
 * It sets up the internal data structures required to efficiently store and retrieve values by different key types.
 *
 * @constructor
 * @example
 *   function MyMap() {
 *     initializeKeyValueStorage.call(this);
 *   }
 */
function initializeKeyValueStorage() {
  // Initialize the size of the storage to zero
  this.size = 0;

  // Set up internal data structures for different key types
  // - 'hash': for keys that are hashable (e.g., objects)
  // - 'string': for string keys
  // - 'map': for other key types, using either Rq or Lq as the constructor
  this.internalData = {
    hash: new GE1(),
    map: new (typeof Rq !== 'undefined' ? Rq : Lq)(),
    string: new GE1()
  };
}

module.exports = initializeKeyValueStorage;