/**
 * Maps the properties of an object using a provided iteratee function.
 *
 * Iterates over the own enumerable properties of the source object, applies the iteratee function to each property,
 * and returns a new object with the mapped values. If the source object is null or undefined, returns an empty object.
 *
 * @param {Object} sourceObject - The object whose properties will be mapped.
 * @param {Function} iteratee - The function invoked per property. Receives (value, key) as arguments.
 * @returns {Object} a new object with the mapped property values.
 */
function mapObjectProperties(sourceObject, iteratee) {
  if (sourceObject == null) return {};

  // Create an array of property keys wrapped in arrays: [[key1], [key2], ...]
  const propertyKeyTuples = mapArray(
    createIterableHelper(sourceObject),
    function(propertyKey) {
      return [propertyKey];
    }
  );

  // Ensure iteratee is a function (normalize if necessary)
  const normalizedIteratee = getConfiguredIteratee(iteratee);

  // Process and filter properties using the normalized iteratee
  return processAndFilterProperties(
    sourceObject,
    propertyKeyTuples,
    function(propertyValue, propertyKeyTuple) {
      // propertyKeyTuple is an array with a single key: [key]
      return normalizedIteratee(propertyValue, propertyKeyTuple[0]);
    }
  );
}

module.exports = mapObjectProperties;