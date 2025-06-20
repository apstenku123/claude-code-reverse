/**
 * Iterates over a collection (array-like or object) and applies a callback to each item.
 * If the collection is not array-like, delegates to a custom handler.
 * Iteration can be performed forwards or backwards based on the 'iterateFromEnd' flag.
 *
 * @param {Function} nonArrayHandler - Function to handle non-array-like collections.
 * @param {boolean} iterateFromEnd - If true, iterates from end to start; otherwise, start to end.
 * @returns {Function} - a function that takes a collection and a callback to apply to each item.
 */
function iterateCollectionWithCallback(nonArrayHandler, iterateFromEnd) {
  return function (collection, callback) {
    // Return early if collection is null or undefined
    if (collection == null) return collection;

    // If not array-like, delegate to the provided handler
    if (!PH(collection)) return nonArrayHandler(collection, callback);

    const length = collection.length;
    let index = iterateFromEnd ? length : -1;
    const collectionObject = Object(collection);

    // Iterate either forwards or backwards based on iterateFromEnd
    while (iterateFromEnd ? index-- : ++index < length) {
      // If callback returns false, break early
      if (callback(collectionObject[index], index, collectionObject) === false) break;
    }
    return collection;
  };
}

module.exports = iterateCollectionWithCallback;