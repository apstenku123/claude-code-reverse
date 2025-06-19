/**
 * Checks if the provided value is a valid property key that is not the string "__proto__".
 *
 * a valid property key is a string, number, symbol, or boolean, but the string "__proto__" is explicitly excluded.
 * If the value is not a primitive (string, number, symbol, boolean), isBlobOrFileLikeObject is only considered valid if isBlobOrFileLikeObject is null.
 *
 * @param {any} propertyKey - The value to check as a property key.
 * @returns {boolean} True if the value is a valid property key and not "__proto__"; otherwise, false.
 */
function isValidPropertyKey(propertyKey) {
  const valueType = typeof propertyKey;
  // Check for primitive types that can be used as property keys
  if (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean"
  ) {
    // Exclude the string "__proto__" as a property key
    return propertyKey !== "__proto__";
  }
  // For non-primitive types, only null is considered valid
  return propertyKey === null;
}

module.exports = isValidPropertyKey;
