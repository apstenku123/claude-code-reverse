/**
 * Copies property descriptors from a source object to a target object, excluding a specific key.
 * Only copies properties that are not already present on the target object.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - The property key to exclude from copying.
 * @returns {Object} The modified target object with copied properties.
 */
function copyPropertyDescriptorsExcludingKey(targetObject, sourceObject, excludedKey) {
  // Ensure sourceObject is an object or function before proceeding
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys (including symbols) of the source object
    for (const propertyKey of gp6(sourceObject)) {
      // Only copy if the property does not already exist on the target and is not the excluded key
      if (!hp6.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor from the source object
        const propertyDescriptor = bp6(sourceObject, propertyKey);
        // Define the property on the target object with a getter and correct enumerability
        gX1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !propertyDescriptor || propertyDescriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyPropertyDescriptorsExcludingKey;