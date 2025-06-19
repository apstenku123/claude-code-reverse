/**
 * Creates a new object by mapping each element of a collection using a custom iteratee function.
 *
 * @param {Object|Array} collection - The collection (object or array) to iterate over.
 * @param {Function} iteratee - The function invoked per iteration. It is processed by getConfiguredIteratee with arity 3.
 * @returns {Object} a new object with keys from the original collection and values returned by the iteratee.
 */
function mapCollectionWithCustomizer(collection, iteratee) {
  // Initialize the result object
  const result = {};
  // Ensure iteratee is a function with arity 3
  const processedIteratee = getConfiguredIteratee(iteratee, 3);
  // Iterate over the collection using the external _3 function
  _3(collection, function (value, key, collectionRef) {
    // Compute the mapped value using the processed iteratee
    const mappedValue = processedIteratee(value, key, collectionRef);
    // Assign the mapped value to the result object using setObjectPropertySafely
    setObjectPropertySafely(result, mappedValue, value);
  });
  return result;
}

module.exports = mapCollectionWithCustomizer;