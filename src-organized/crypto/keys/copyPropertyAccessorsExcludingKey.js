/**
 * Copies property accessors from a source object to a target object, excluding a specific key.
 * Only properties that are not already present on the target and are not the excluded key are copied.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object|Function} sourceObject - The object from which properties will be copied.
 * @param {string|symbol} excludedKey - The property key to exclude from copying.
 * @param {any} [descriptorCache] - Optional cache for property descriptor (used internally).
 * @returns {Object} The modified target object with copied property accessors.
 */
function copyPropertyAccessorsExcludingKey(targetObject, sourceObject, excludedKey, descriptorCache) {
  // Ensure sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all property keys (including symbols) of the source object
    for (const propertyKey of mA4(sourceObject)) {
      // Only copy if property does not exist on target and is not the excluded key
      if (!dA4.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor to check enumerability
        const propertyDescriptor = hA4(sourceObject, propertyKey);
        IB1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !propertyDescriptor || propertyDescriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyPropertyAccessorsExcludingKey;