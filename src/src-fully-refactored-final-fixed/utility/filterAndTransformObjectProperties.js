/**
 * Filters and transforms the properties of an object using a provided predicate function.
 *
 * @param {Object} sourceObject - The object whose properties will be filtered and transformed.
 * @param {Function} predicate - The function invoked per property. Receives (value, key) and should return the transformed value or undefined to exclude the property.
 * @returns {Object} a new object with properties that passed the predicate and were transformed by isBlobOrFileLikeObject.
 */
function filterAndTransformObjectProperties(sourceObject, predicate) {
  // Return an empty object if the source is null or undefined
  if (sourceObject == null) return {};

  // createIterableHelper: createIterableHelper - gets all property keys of the source object
  const propertyKeys = createIterableHelper(sourceObject);

  // mapArray: maps each key to an array containing just that key (for compatibility with processAndFilterProperties)
  const propertyKeyTuples = mapArrayDeep(propertyKeys, function (key) {
    return [key];
  });

  // getConfiguredIteratee: ensures the predicate is a function (normalizes isBlobOrFileLikeObject)
  const normalizedPredicate = normalizePredicate(predicate);

  // processAndFilterProperties: processAndFilterProperties - builds a new object by applying the predicate to each property
  return processAndFilterProperties(
    sourceObject,
    propertyKeyTuples,
    function (propertyValue, keyTuple) {
      // keyTuple is an array with a single key
      return normalizedPredicate(propertyValue, keyTuple[0]);
    }
  );
}

module.exports = filterAndTransformObjectProperties;