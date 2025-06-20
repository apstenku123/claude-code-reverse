/**
 * Maps the properties of a source object using a provided predicate function.
 *
 * Iterates over all enumerable property keys of the source object, applies the predicate function
 * to each property value and key, and constructs a new object with the mapped results.
 *
 * @param {Object} sourceObject - The object whose properties will be mapped.
 * @param {Function} predicate - The function to apply to each property value and key. Should accept (value, key).
 * @returns {Object} a new object with the mapped property values.
 */
function mapObjectPropertiesWithPredicate(sourceObject, predicate) {
  // Return an empty object if the source object is null or undefined
  if (sourceObject == null) return {};

  // Create an array of property keys, each wrapped in an array (for compatibility with downstream logic)
  const propertyKeyTuples = mapArray(
    createIterableHelper(sourceObject),
    function (propertyKey) {
      return [propertyKey];
    }
  );

  // Ensure the predicate is in the correct format (possibly binding context or normalizing signature)
  const normalizedPredicate = getConfiguredIteratee(predicate);

  // Use processAndMapProperties to iterate and map each property
  return processAndMapProperties(
    sourceObject,
    propertyKeyTuples,
    function (propertyValue, propertyKeyTuple) {
      // propertyKeyTuple is an array with a single key
      return normalizedPredicate(propertyValue, propertyKeyTuple[0]);
    }
  );
}

module.exports = mapObjectPropertiesWithPredicate;