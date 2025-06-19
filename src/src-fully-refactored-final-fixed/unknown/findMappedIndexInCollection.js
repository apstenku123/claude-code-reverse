/**
 * Finds the index of an element in a collection after applying a mapping function, and returns the corresponding value from the original or mapped collection.
 *
 * @param {Function} iteratee - The function used to iterate over the collection (e.g., Array.prototype.findIndex or a custom function).
 * @returns {Function} a function that takes a collection, a mapping function, and an optional context, and returns the value at the found index or a default value if not found.
 */
function findMappedIndexInCollection(iteratee) {
  return function (collection, mapFn, context) {
    // Create a shallow copy or proxy of the collection for safe access
    const collectionProxy = mergePropertiesWithDescriptors(collection);

    // If the collection is not array-like, prepare a mapping function
    if (!_8(collection)) {
      // Wrap the mapping function to always receive three arguments
      const mappedAccessor = getConfiguredIteratee(mapFn, 3);
      // Convert the collection to an array-like structure
      collection = lQ(collection);
      // Redefine mapFn to apply mappedAccessor to each item in the proxy
      mapFn = function (index) {
        return mappedAccessor(collectionProxy[index], index, collectionProxy);
      };
    }

    // Use the iteratee to find the index based on the mapping function
    const foundIndex = iteratee(collection, mapFn, context);

    // If a valid index is found, return the corresponding value from the proxy
    // If a mapping function was used, map the found index through the original collection
    // Otherwise, return the value at the found index
    return foundIndex > -1
      ? collectionProxy[mapFn ? collection[foundIndex] : foundIndex]
      : a;
  };
}

module.exports = findMappedIndexInCollection;