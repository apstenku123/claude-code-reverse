/**
 * Copies all own property keys from the source object to the target object, except for a specified key,
 * and only if the property does not already exist on the target. Property descriptors are preserved.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object} sourceObject - The object from which properties will be copied.
 * @param {string|symbol} excludedKey - The property key to exclude from copying.
 * @returns {Object} The modified target object with copied properties.
 */
function copyMissingPropertiesExceptKey(targetObject, sourceObject, excludedKey) {
  // Ensure sourceObject is an object or function before proceeding
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys (including symbols)
    for (const propertyKey of iB4(sourceObject)) {
      // Only copy if the property does not exist on targetObject and is not the excludedKey
      if (!nB4.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor from sourceObject
        const propertyDescriptor = lB4(sourceObject, propertyKey);
        // Define the property on targetObject with a getter and correct enumerability
        aB1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !propertyDescriptor || propertyDescriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyMissingPropertiesExceptKey;
