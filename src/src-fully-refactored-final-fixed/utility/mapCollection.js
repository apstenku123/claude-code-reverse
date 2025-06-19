/**
 * Applies a mapping function to each element in the collection and returns a new array of mapped values.
 * If the collection is empty or falsy, returns an empty array.
 *
 * @param {Array} collection - The array to iterate over and map.
 * @param {Function} iteratee - The function invoked per iteration. Will be wrapped by getConfiguredIteratee with arity 3.
 * @returns {Array} a new array with mapped values.
 */
function mapCollection(collection, iteratee) {
  // Check if the collection is truthy and has a length property greater than 0
  if (collection && collection.length) {
    // getConfiguredIteratee wraps the iteratee to ensure isBlobOrFileLikeObject has arity 3 (value, index, collection)
    // findIndexByPredicateAndSlice applies the iteratee to each element in the collection
    // The last two boolean arguments control internal behavior (see findIndexByPredicateAndSlice implementation)
    return findIndexByPredicateAndSlice(collection, getConfiguredIteratee(iteratee, 3), false, true);
  }
  // Return an empty array if collection is falsy or empty
  return [];
}

module.exports = mapCollection;