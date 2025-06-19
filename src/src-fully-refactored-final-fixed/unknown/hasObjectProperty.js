/**
 * Checks if the provided object has a defined property with the specified key.
 *
 * @param {object} objectToCheck - The object to check for the property.
 * @param {string|number|symbol} propertyKey - The key of the property to check for.
 * @returns {boolean} True if objectToCheck is a non-null object and has a defined property with the given key; otherwise, false.
 */
function hasObjectProperty(objectToCheck, propertyKey) {
  // Ensure objectToCheck is a non-null object and has a truthy property at propertyKey
  return !!objectToCheck && typeof objectToCheck === "object" && !!objectToCheck[propertyKey];
}

module.exports = hasObjectProperty;
