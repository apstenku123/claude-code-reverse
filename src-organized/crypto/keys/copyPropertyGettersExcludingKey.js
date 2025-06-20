/**
 * Copies property getters from the source object to the target object, excluding a specific key.
 *
 * For each own property key in the source object (excluding the excludedKey and any key already present on the target),
 * this function defines a getter on the target object that returns the value from the source object.
 * The enumerable flag is preserved if possible.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object|Function} sourceObject - The object from which properties will be copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @returns {Object} The modified target object with copied property getters.
 */
function copyPropertyGettersExcludingKey(targetObject, sourceObject, excludedKey) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys of sourceObject
    for (const propertyKey of Kj6(sourceObject)) {
      // Skip if property already exists on targetObject or is the excludedKey
      if (!Hj6.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor to preserve enumerability
        const propertyDescriptor = Vj6(sourceObject, propertyKey);
        MJ1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !propertyDescriptor || propertyDescriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyPropertyGettersExcludingKey;