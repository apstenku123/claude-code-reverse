/**
 * Maps the properties of an object using a custom iteratee function.
 *
 * This utility function creates a new object by applying a custom iteratee function
 * to each property of the input object. The iteratee receives the property value and key.
 *
 * @param {Object} sourceObject - The object whose properties will be mapped.
 * @param {Function} iteratee - The function to apply to each property. Receives (value, key).
 * @returns {Object} a new object with the same keys as sourceObject, but with values returned by the iteratee.
 */
function mapObjectWithCustomFunction(sourceObject, iteratee) {
  if (sourceObject == null) return {};

  // Get all keys of the source object and wrap each key in an array
  const propertyKeyArrays = mapArray(createIterableHelper(sourceObject), function (propertyKey) {
    return [propertyKey];
  });

  // Ensure the iteratee is properly wrapped or normalized
  const normalizedIteratee = getConfiguredIteratee(iteratee);

  // Use processAndFilterProperties to map over the object with the normalized iteratee
  return processAndFilterProperties(sourceObject, propertyKeyArrays, function (propertyValue, keyArray) {
    // keyArray is an array with a single key
    return normalizedIteratee(propertyValue, keyArray[0]);
  });
}

module.exports = mapObjectWithCustomFunction;