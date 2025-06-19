/**
 * Applies a provided iteratee function to each element of a collection, finds the index of the first element
 * that satisfies the iteratee, and returns the corresponding value from the original collection or a default value.
 *
 * @param {Function} iterateeFunction - The function to apply to each element for testing.
 * @returns {Function} - a function that takes a collection, an iteratee, and an optional context, and returns the mapped result or a default value.
 */
function findIndexAndMapResult(iterateeFunction) {
  return function (collection, iteratee, context) {
    // Create a shallow copy of the collection (array or object values)
    const collectionValues = mergePropertiesWithDescriptors(collection);

    // If the collection is not array-like, wrap the iteratee to work with the mapped values
    let mappedIteratee = iteratee;
    let originalCollection = collection;
    if (!_8(collection)) {
      // getConfiguredIteratee returns a function that applies the iteratee to the value, key, and the collection
      mappedIteratee = getConfiguredIteratee(iteratee, 3);
      // Convert the collection to an array of keys
      originalCollection = lQ(collection);
      // Redefine the iteratee to operate on the mapped values
      mappedIteratee = function (key) {
        return iteratee(collectionValues[key], key, collectionValues);
      };
    }

    // Use the provided iterateeFunction to find the index
    const foundIndex = iterateeFunction(originalCollection, mappedIteratee, context);

    // If a valid index is found, return the corresponding value from the collectionValues
    // If not, return the default value a(mapInteractionsToRoutes)
    return foundIndex > -1 ? collectionValues[mappedIteratee ? originalCollection[foundIndex] : foundIndex] : a;
  };
}

module.exports = findIndexAndMapResult;