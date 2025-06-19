/**
 * Creates a factory function for generating custom iterators over a specific property of a source object.
 * The iterator supports returning keys, values, or [key, value] pairs, similar to Map/Set iterators.
 *
 * @param {string} iterableType - The name of the iterable type (used for error messages and toStringTag).
 * @param {string} iterationMode - Determines what the iterator yields: 'key', 'value', or 'key+value'.
 * @param {number} keyIndex - The index in the entry array representing the key (default: 0).
 * @param {number} valueIndex - The index in the entry array representing the value (default: 1).
 * @returns {function} a factory function that, given a source object and property name, returns a custom iterator instance.
 */
function createCustomIteratorFactory(
  iterableType,
  iterationMode,
  keyIndex = 0,
  valueIndex = 1
) {
  class CustomIterator {
    #propertyName;
    #iterationMode;
    #currentIndex;
    constructor(propertyName, iterationMode) {
      this.#propertyName = propertyName;
      this.#iterationMode = iterationMode;
      this.#currentIndex = 0;
    }

    /**
     * Returns the next iteration result according to the iteration mode.
     * @returns {{value: any, done: boolean}}
     */
    next() {
      // Ensure 'this' is a valid CustomIterator instance
      if (typeof this !== "object" || this === null || !(#propertyName in this)) {
        throw new TypeError(`'next' called on an object that does not implement interface ${iterableType} Iterator.`);
      }

      const currentIndex = this.#currentIndex;
      const entries = this.#propertyName[iterationMode];
      const entriesLength = entries.length;

      // If handleMissingDoctypeError'removeTrailingCharacters reached the end, return done
      if (currentIndex >= entriesLength) {
        return {
          value: undefined,
          done: true
        };
      }

      // Destructure the entry at the current index
      const entry = entries[currentIndex];
      const key = entry[keyIndex];
      const value = entry[valueIndex];

      this.#currentIndex = currentIndex + 1;

      let resultValue;
      switch (this.#iterationMode) {
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
  delete CustomIterator.prototype.constructor;

  // Set up prototype chain and define iterator properties
  Object.setPrototypeOf(CustomIterator.prototype, aF6);
  Object.defineProperties(CustomIterator.prototype, {
    [Symbol.toStringTag]: {
      writable: false,
      enumerable: false,
      configurable: true,
      value: `${iterableType} Iterator`
    },
    next: {
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  /**
   * Factory function to create a new iterator instance.
   * @param {object} sourceObject - The object to iterate over.
   * @param {string} propertyName - The property name containing the entries array.
   * @returns {CustomIterator}
   */
  return function createIteratorInstance(sourceObject, propertyName) {
    return new CustomIterator(sourceObject, propertyName);
  };
}

module.exports = createCustomIteratorFactory;