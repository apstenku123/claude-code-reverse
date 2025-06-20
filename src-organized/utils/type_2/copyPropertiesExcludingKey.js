/**
 * Copies all own enumerable properties (including symbols) from the source object to the target object,
 * except for a specified excluded key. Properties are defined with getters that access the source object,
 * and preserve enumerability where possible.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @param {Object} [propertyDescriptor] - Optional property descriptor cache (used internally).
 * @returns {Object} The target object with copied properties.
 */
function copyPropertiesExcludingKey(targetObject, sourceObject, excludedKey, propertyDescriptor) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys (including symbols) of sourceObject
    for (const propertyKey of h44(sourceObject)) {
      // Only copy if property does not already exist on targetObject and is not the excludedKey
      if (!m44.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor for enumerability check
        const descriptor = g44(sourceObject, propertyKey);
        // Define the property on targetObject with a getter and correct enumerability
        fB1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !descriptor || descriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyPropertiesExcludingKey;