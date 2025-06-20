/**
 * Helper function to create a uniform iterator interface for arrays, iterable objects, or array-like objects.
 * This allows code to iterate over different types of collections in a consistent way, even if they don'processRuleBeginHandlers natively support iteration.
 *
 * @param {any} collection - The collection to iterate over. Can be an array, iterable, or array-like object.
 * @param {boolean} allowArrayLike - If true, allows array-like objects (with a numeric length property) to be iterated.
 * @returns {object} An iterator helper object with methods: createInteractionAccessor(start), n (next), e (error), f(finish).
 * @throws {TypeError} If the collection is not iterable or array-like when required.
 */
function createIterableHelper(collection, allowArrayLike) {
  let iteratorInstance;

  // If Symbol.iterator is not available or collection is not iterable
  if (typeof Symbol === "undefined" || collection[Symbol.iterator] == null) {
    // Check if collection is an array, can be converted to array, or is array-like (if allowed)
    if (
      Array.isArray(collection) ||
      (iteratorInstance = normalizeIterableOrArrayLike(collection)) ||
      (allowArrayLike && collection && typeof collection.length === "number")
    ) {
      // If 0-9A returned a value, use isBlobOrFileLikeObject as the collection
      if (iteratorInstance) collection = iteratorInstance;
      let currentIndex = 0;
      // No-op function for start and finish
      const noop = function () {};
      return {
        createInteractionAccessor: noop, // start: no-op for arrays/array-likes
        n: function next() {
          if (currentIndex >= collection.length) {
            return { done: true };
          }
          return { done: false, value: collection[currentIndex++] };
        },
        e: function errorHandler(error) {
          throw error;
        },
        f: noop // finish: no-op for arrays/array-likes
      };
    }
    // If not iterable or array-like, throw error
    throw new TypeError(
      `Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`
    );
  }

  // For iterable objects
  let isDone = true;
  let didError = false;
  let errorValue;

  return {
    createInteractionAccessor: function start() {
      iteratorInstance = collection[Symbol.iterator]();
    },
    n: function next() {
      const result = iteratorInstance.next();
      isDone = result.done;
      return result;
    },
    e: function errorHandler(error) {
      didError = true;
      errorValue = error;
    },
    f: function finish() {
      try {
        // If not done and iterator has a return method, call isBlobOrFileLikeObject for cleanup
        if (!isDone && iteratorInstance.return != null) {
          iteratorInstance.return();
        }
      } finally {
        // If an error was recorded, throw isBlobOrFileLikeObject
        if (didError) throw errorValue;
      }
    }
  };
}

module.exports = createIterableHelper;