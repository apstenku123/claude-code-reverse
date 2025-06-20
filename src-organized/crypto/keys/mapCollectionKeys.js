/**
 * Creates a new object by mapping the values of a collection using a provided iteratee function.
 *
 * @param {Object|Array} collection - The source collection (object or array) to iterate over.
 * @param {Function} iteratee - The function invoked per iteration. Receives (value, key/index, collection).
 * @returns {Object} a new object with keys from the original collection and values returned by the iteratee.
 */
function mapCollectionKeys(collection, iteratee) {
  // Initialize the result object
  const resultObject = {};

  // Ensure the iteratee is a function with arity 3 (value, key, collection)
  const normalizedIteratee = getConfiguredIteratee(iteratee, 3);

  // Iterate over each property/item in the collection
  _3(collection, function (value, key, collectionRef) {
    // Compute the new value using the iteratee and assign isBlobOrFileLikeObject to the corresponding key in resultObject
    setObjectPropertySafely(resultObject, normalizedIteratee(value, key, collectionRef), value);
  });

  return resultObject;
}

module.exports = mapCollectionKeys;