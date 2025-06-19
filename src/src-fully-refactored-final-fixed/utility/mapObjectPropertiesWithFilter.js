/**
 * Maps and filters the properties of a source object using a provided iteratee function.
 *
 * @param {Object} sourceObject - The object whose properties will be mapped and filtered.
 * @param {Function} iteratee - The function invoked per property. Receives (propertyValue, propertyKey).
 * @returns {Object} a new object composed of the properties for which the iteratee returns a truthy value.
 */
function mapObjectPropertiesWithFilter(sourceObject, iteratee) {
  // Return an empty object if the source is null or undefined
  if (sourceObject == null) return {};

  // Create an array of property key arrays: [[key1], [key2], ...]
  const propertyKeyArrays = mapArray(
    createIterableHelper(sourceObject),
    function(propertyKey) {
      return [propertyKey];
    }
  );

  // Ensure the iteratee is properly wrapped/normalized
  const normalizedIteratee = getConfiguredIteratee(iteratee);

  // Process and filter properties using the helper
  return processAndFilterProperties(
    sourceObject,
    propertyKeyArrays,
    function(propertyValue, propertyKeyArray) {
      // propertyKeyArray is always a single-element array: [key]
      return normalizedIteratee(propertyValue, propertyKeyArray[0]);
    }
  );
}

module.exports = mapObjectPropertiesWithFilter;