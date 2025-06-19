/**
 * Creates a function that iterates over a collection, applying a callback to each element.
 * The iteration can be performed from left-to-right or right-to-left based on the 'iterateFromRight' flag.
 * If the collection is not array-like, a fallback handler is used.
 *
 * @param {Function} fallbackHandler - Function to handle non-array-like collections.
 * @param {boolean} iterateFromRight - If true, iterates from right to left; otherwise, left to right.
 * @returns {Function} Iterator function that processes a collection with a callback.
 */
function createCollectionIterator(fallbackHandler, iterateFromRight) {
  return function iterateCollection(collection, callback) {
    // Return early if collection is null or undefined
    if (collection == null) return collection;

    // If collection is not array-like, use the fallback handler
    if (!isArrayLike(collection)) return fallbackHandler(collection, callback);

    const collectionLength = collection.length;
    // Determine starting index based on iteration direction
    let index = iterateFromRight ? collectionLength : -1;
    // Create a shallow copy or wrapper for the collection
    const iterable = toIterable(collection);

    // Iterate over the collection in the specified direction
    while (iterateFromRight ? index-- : ++index < collectionLength) {
      // If callback returns false, break early
      if (callback(iterable[index], index, iterable) === false) break;
    }
    return collection;
  };
}

// Dependency placeholders (should be replaced with actual implementations)
function isArrayLike(obj) {
  // Example implementation: checks for array-like structure
  return obj != null && typeof obj.length === 'number' && obj.length >= 0;
}

function toIterable(obj) {
  // Example implementation: returns the object as-is
  return obj;
}

module.exports = createCollectionIterator;