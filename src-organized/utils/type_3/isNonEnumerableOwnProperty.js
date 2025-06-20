/**
 * Determines if a given property is an own property of an object, is non-enumerable, and passes an external predicate check.
 *
 * @param {Object} targetObject - The object to check for the property.
 * @param {string|symbol} propertyKey - The property key to check on the object.
 * @returns {boolean} True if the property exists on the object, passes the hasPropertySafe predicate, and is non-enumerable; otherwise, false.
 */
function isNonEnumerableOwnProperty(targetObject, propertyKey) {
  // Check if the property passes the external predicate (hasPropertySafe)
  // and is an own property that is NOT enumerable
  return (
    hasPropertySafe(targetObject, propertyKey) &&
    !(
      Object.hasOwnProperty.call(targetObject, propertyKey) &&
      Object.propertyIsEnumerable.call(targetObject, propertyKey)
    )
  );
}

module.exports = isNonEnumerableOwnProperty;