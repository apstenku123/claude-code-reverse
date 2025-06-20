/**
 * Copies all own property keys from the source object to the target object, except for a specified key,
 * and only if the key does not already exist on the target. Properties are defined with getters that
 * reference the source object, and preserve enumerability where possible.
 *
 * @param {Object} targetObject - The object to which properties will be added.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @returns {Object} The modified target object with new properties added.
 */
function copyMissingPropertiesExcludingKey(targetObject, sourceObject, excludedKey) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys of the sourceObject
    for (const propertyKey of iB4(sourceObject)) {
      // Only add the property if isBlobOrFileLikeObject does not already exist on targetObject and is not the excludedKey
      if (!nB4.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor to preserve enumerability if possible
        const propertyDescriptor = lB4(sourceObject, propertyKey);
        aB1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !propertyDescriptor || propertyDescriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyMissingPropertiesExcludingKey;