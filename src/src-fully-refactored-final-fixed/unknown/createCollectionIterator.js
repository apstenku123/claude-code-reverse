/**
 * Iterates over a collection, applying a callback to each element. Handles both array-like and non-array-like collections.
 *
 * If the collection is not array-like, delegates to a custom handler. Otherwise, iterates through the collection and invokes the callback for each item.
 * The iteration can be performed in reverse if specified, and can be terminated early if the callback returns false.
 *
 * @param {Function} nonArrayHandler - Function to handle non-array-like collections. Receives (collection, callback).
 * @param {boolean} iterateFromRight - If true, iterates the collection from right to left.
 * @returns {Function} - a function that takes (collection, callback) and iterates accordingly.
 */
function createCollectionIterator(nonArrayHandler, iterateFromRight) {
  return function iterate(collection, callback) {
    // If collection is null or undefined, return as is
    if (collection == null) return collection;

    // If collection is not array-like, delegate to the nonArrayHandler
    if (!isArrayLike(collection)) {
      return nonArrayHandler(collection, callback);
    }

    const length = collection.length;
    // Determine starting index based on iteration direction
    let index = iterateFromRight ? length : -1;
    const collectionObject = Object(collection);

    // Iterate over the collection
    while (iterateFromRight ? index-- : ++index < length) {
      // If callback returns false, break early
      if (callback(collectionObject[index], index, collectionObject) === false) {
        break;
      }
    }
    return collection;
  };
}

// Helper function to check if a value is array-like
function isArrayLike(value) {
  return value != null && typeof value.length === 'number' && value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER;
}

module.exports = createCollectionIterator;