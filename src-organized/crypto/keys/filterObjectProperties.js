/**
 * Filters the properties of an object based on a predicate function.
 *
 * Iterates over the enumerable property keys of the source object, applies the predicate function
 * to each property, and accumulates the properties for which the predicate returns a truthy value
 * into a new object.
 *
 * @param {Object} sourceObject - The object whose properties will be filtered.
 * @param {Function} predicate - The function invoked per property. Receives (value, key).
 * @returns {Object} a new object containing only the properties that pass the predicate check.
 */
function filterObjectProperties(sourceObject, predicate) {
  if (sourceObject == null) return {};

  // Get all enumerable property keys of the source object
  const propertyKeys = createIterableHelper(sourceObject).map(function (key) {
    return [key];
  });

  // Ensure the predicate is a valid function
  const normalizedPredicate = normalizePredicate(predicate);

  // Process and filter properties using the provided predicate
  return processAndFilterProperties(sourceObject, propertyKeys, function (value, keyArray) {
    // keyArray is an array with a single key
    return normalizedPredicate(value, keyArray[0]);
  });
}

module.exports = filterObjectProperties;