/**
 * Applies a mapping callback to each element of a collection if isBlobOrFileLikeObject exists and is not empty.
 * Returns an empty array if the collection is null, undefined, or empty.
 *
 * @param {Array} collection - The array or collection to iterate over.
 * @param {Function} callback - The function to apply to each element. If not provided, a noop is used.
 * @returns {Array} a new array with the results of calling the provided function on every element in the collection, or an empty array if the collection is empty or falsy.
 */
function mapCollectionWithCallback(collection, callback) {
  // Check if the collection exists and has elements
  if (collection && collection.length) {
    // getConfiguredIteratee wraps the callback, possibly providing a default or context
    // findIndexByPredicateAndSlice applies the callback to each element of the collection
    return findIndexByPredicateAndSlice(collection, getConfiguredIteratee(callback, 3));
  } else {
    // Return an empty array if collection is falsy or empty
    return [];
  }
}

module.exports = mapCollectionWithCallback;