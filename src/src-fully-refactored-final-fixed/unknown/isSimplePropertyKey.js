/**
 * Determines if a given value is a simple property key (such as a primitive or a valid property name).
 * 
 * @param {*} propertyKey - The value to check as a property key.
 * @param {*} objectContext - (Optional) The object to check property existence against.
 * @returns {boolean} True if the value is a simple property key, otherwise false.
 */
function isSimplePropertyKey(propertyKey, objectContext) {
  // If propertyKey is an object-like structure (e.g., array, object), return false
  if (d2(propertyKey)) return false;

  const propertyKeyType = typeof propertyKey;

  // If propertyKey is a primitive type (number, symbol, boolean), null, or a special object (O7)
  if (
    propertyKeyType === "number" ||
    propertyKeyType === "symbol" ||
    propertyKeyType === "boolean" ||
    propertyKey == null ||
    O7(propertyKey)
  ) {
    return true;
  }

  // Otherwise, check if propertyKey matches a valid property name pattern (L3),
  // or does NOT match a forbidden pattern (qB),
  // or if objectContext is provided and propertyKey exists in its keys (via mergePropertiesWithDescriptors)
  return (
    L3.test(propertyKey) ||
    !qB.test(propertyKey) ||
    (objectContext != null && propertyKey in mergePropertiesWithDescriptors(objectContext))
  );
}

module.exports = isSimplePropertyKey;