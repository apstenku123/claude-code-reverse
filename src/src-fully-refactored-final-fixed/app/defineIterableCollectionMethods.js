/**
 * Defines standard iterable and forEach methods (keys, values, entries, forEach, Symbol.iterator)
 * on the prototype of a given collection class.
 *
 * @param {string} collectionName - The name of the collection (used in error messages).
 * @param {Function} CollectionConstructor - The constructor function of the collection class.
 * @param {Function} getIteratorFunction - a function that returns an iterator for the collection instance.
 * @param {number} [startIndex=0] - Optional start index for iteration (passed to getIteratorFunction).
 * @param {number} [step=1] - Optional step value for iteration (passed to getIteratorFunction).
 * @returns {void}
 *
 * This function attaches the following methods to the prototype of CollectionConstructor:
 *   - keys(): Returns an iterator over the keys.
 *   - values(): Returns an iterator over the values.
 *   - entries(): Returns an iterator over [key, value] pairs.
 *   - forEach(callback, thisArg): Iterates over each [key, value] pair and calls the callback.
 *   - [Symbol.iterator](): Alias for entries().
 *
 * The methods perform brand checks and argument validation using the Qr utility.
 */
function defineIterableCollectionMethods(
  collectionName,
  CollectionConstructor,
  getIteratorFunction,
  startIndex = 0,
  step = 1
) {
  // Create a closure for the iterator function with the provided startIndex and step
  const createIterator = createIteratorFactory(collectionName, getIteratorFunction, startIndex, step);

  // Define the methods to be attached to the prototype
  const methodDescriptors = {
    keys: {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function keys() {
        // Ensure the method is called on the correct brand
        Qr.brandCheck(this, CollectionConstructor);
        // Return an iterator over the keys
        return createIterator(this, "key");
      }
    },
    values: {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function values() {
        Qr.brandCheck(this, CollectionConstructor);
        // Return an iterator over the values
        return createIterator(this, "value");
      }
    },
    entries: {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function entries() {
        Qr.brandCheck(this, CollectionConstructor);
        // Return an iterator over [key, value] pairs
        return createIterator(this, "key+value");
      }
    },
    forEach: {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function forEach(callback, thisArg = globalThis) {
        Qr.brandCheck(this, CollectionConstructor);
        // Ensure at least one argument is provided (the callback)
        Qr.argumentLengthCheck(arguments, 1, `${collectionName}.forEach`);
        if (typeof callback !== "function") {
          throw new TypeError(`Failed to execute 'forEach' on '${collectionName}': parameter 1 is not of type 'Function'.`);
        }
        // Iterate over [key, value] pairs and invoke the callback
        for (const [key, value] of createIterator(this, "key+value")) {
          callback.call(thisArg, value, key, this);
        }
      }
    }
  };

  // Attach the methods and Symbol.iterator to the prototype
  Object.defineProperties(CollectionConstructor.prototype, {
    ...methodDescriptors,
    [Symbol.iterator]: {
      writable: true,
      enumerable: false,
      configurable: true,
      // Symbol.iterator is an alias for entries()
      value: methodDescriptors.entries.value
    }
  });
}

module.exports = defineIterableCollectionMethods;
