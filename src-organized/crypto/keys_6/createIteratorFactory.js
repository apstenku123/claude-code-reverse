/**
 * Creates a factory function for custom iterators over a collection.
 *
 * @param {string} collectionType - The name/type of the collection (used for error messages and Symbol.toStringTag).
 * @param {string} iterationKind - Determines what the iterator yields: 'key', 'value', or 'key+value'.
 * @param {number} keyIndex - The index in the entry array representing the key (default: 0).
 * @param {number} valueIndex - The index in the entry array representing the value (default: 1).
 * @returns {function(any[], string): object} - a factory function that creates a new iterator instance for the given entries and iteration kind.
 */
function createIteratorFactory(collectionType, iterationKind, keyIndex = 0, valueIndex = 1) {
  class CollectionIterator {
    #entries;
    #iterationKind;
    #currentIndex;

    /**
     * @param {Array} entries - The collection entries to iterate over.
     * @param {string} iterationKind - The kind of iteration: 'key', 'value', or 'key+value'.
     */
    constructor(entries, iterationKind) {
      this.#entries = entries;
      this.#iterationKind = iterationKind;
      this.#currentIndex = 0;
    }

    /**
     * Returns the next item in the iteration sequence.
     * @returns {{value: any, done: boolean}}
     */
    next() {
      // Validate that 'this' is a proper CollectionIterator instance
      if (typeof this !== "object" || this === null || !(CollectionIterator.prototype.isPrototypeOf(this))) {
        throw new TypeError(`'next' called on an object that does not implement interface ${collectionType} Iterator.`);
      }

      const currentIndex = this.#currentIndex;
      const entries = this.#entries[iterationKind];
      const entriesLength = entries.length;

      // If handleMissingDoctypeError'removeTrailingCharacters iterated over all entries, mark as done
      if (currentIndex >= entriesLength) {
        return {
          value: undefined,
          done: true
        };
      }

      // Destructure the current entry into key and value
      const entry = entries[currentIndex];
      const key = entry[keyIndex];
      const value = entry[valueIndex];
      this.#currentIndex = currentIndex + 1;

      let resultValue;
      switch (this.#iterationKind) {
        case "key":
          resultValue = key;
          break;
        case "value":
          resultValue = value;
          break;
        case "key+value":
          resultValue = [key, value];
          break;
        default:
          resultValue = undefined;
      }

      return {
        value: resultValue,
        done: false
      };
    }
  }

  // Remove the constructor from the prototype
  delete CollectionIterator.prototype.constructor;

  // Set up prototype chain and Symbol.toStringTag
  Object.setPrototypeOf(CollectionIterator.prototype, aF6);
  Object.defineProperties(CollectionIterator.prototype, {
    [Symbol.toStringTag]: {
      writable: false,
      enumerable: false,
      configurable: true,
      value: `${collectionType} Iterator`
    },
    next: {
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  /**
   * Factory function to create a new iterator instance.
   * @param {Array} entries - The collection entries to iterate over.
   * @param {string} iterationKind - The kind of iteration: 'key', 'value', or 'key+value'.
   * @returns {CollectionIterator}
   */
  return function createIterator(entries, iterationKind) {
    return new CollectionIterator(entries, iterationKind);
  };
}

module.exports = createIteratorFactory;