/**
 * Applies a transformation function to each element of a collection, returning a new array.
 * If the collection is empty or falsy, returns an empty array.
 *
 * @param {Array} collection - The array or collection to iterate over.
 * @param {Function} iteratee - The function invoked per iteration. Will be wrapped by getConfiguredIteratee with arity 3.
 * @returns {Array} a new array with each element transformed by the iteratee function.
 */
function mapCollectionWithFunction(collection, iteratee) {
  // Check if the collection exists and has elements
  if (collection && collection.length) {
    // Wrap the iteratee with getConfiguredIteratee(with arity 3), then map over the collection using findIndexByPredicateAndSlice
    return findIndexByPredicateAndSlice(collection, getConfiguredIteratee(iteratee, 3));
  }
  // Return an empty array if collection is falsy or empty
  return [];
}

module.exports = mapCollectionWithFunction;