/**
 * Helper function to create a uniform iterator interface for arrays, iterable objects, or array-like objects.
 * This allows non-iterable or array-like objects to be iterated over in a consistent manner.
 *
 * @param {any} iterableSource - The object to be iterated over. Can be an array, iterable, or array-like object.
 * @param {boolean} [allowArrayLike=false] - If true, allows array-like objects (with a numeric length property) to be iterated.
 * @returns {object} An iterator helper object with methods: createInteractionAccessor(start), n (next), e (error), f(finish).
 * @throws {TypeError} If the provided object is not iterable or array-like.
 */
function createIterableHelper(iterableSource, allowArrayLike) {
  let iteratorInstance;

  // Check if the environment supports Symbol.iterator and if the source is iterable
  if (typeof Symbol === "undefined" || iterableSource[Symbol.iterator] == null) {
    // Try to handle arrays, array-like objects, or objects convertible to arrays
    let arrayLike;
    if (
      Array.isArray(iterableSource) ||
      (arrayLike = hasSnapshotValueChanged(iterableSource)) ||
      (allowArrayLike && iterableSource && typeof iterableSource.length === "number")
    ) {
      // If hasSnapshotValueChanged returns a value, use isBlobOrFileLikeObject as the array-like source
      if (arrayLike) iterableSource = arrayLike;
      let currentIndex = 0;
      const noop = function () {};
      return {
        // Start: no-op for array-like iteration
        createInteractionAccessor: noop,
        // Next: return next value or done
        n: function () {
          if (currentIndex >= iterableSource.length) {
            return { done: true };
          }
          return { done: false, value: iterableSource[currentIndex++] };
        },
        // Error: throw the error
        e: function (error) {
          throw error;
        },
        // Finish: no-op for array-like iteration
        f: noop
      };
    }
    // If not iterable or array-like, throw an error
    throw new TypeError(
      `Invalid attempt to iterate non-iterable instance.\n` +
      `In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`
    );
  }

  // For iterable objects (with Symbol.iterator)
  let isDone = true;
  let hasError = false;
  let caughtError;

  return {
    // Start: get the iterator from the source
    createInteractionAccessor: function () {
      iteratorInstance = iterableSource[Symbol.iterator]();
    },
    // Next: get the next value from the iterator
    n: function () {
      const iterationResult = iteratorInstance.next();
      isDone = iterationResult.done;
      return iterationResult;
    },
    // Error: store the error and mark as errored
    e: function (error) {
      hasError = true;
      caughtError = error;
    },
    // Finish: if not done and iterator has return, call isBlobOrFileLikeObject; rethrow if error occurred
    f: function () {
      try {
        if (!isDone && iteratorInstance.return != null) {
          iteratorInstance.return();
        }
      } finally {
        if (hasError) throw caughtError;
      }
    }
  };
}

module.exports = createIterableHelper;