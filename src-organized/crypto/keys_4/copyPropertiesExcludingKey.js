/**
 * Copies all own property keys from the source object to the target object, except for a specified excluded key.
 * Properties are defined with getters that access the source object, and preserve enumerability where possible.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @param {any} _unused - An unused parameter (for compatibility with original signature).
 * @returns {Object} The target object with copied properties.
 */
function copyPropertiesExcludingKey(targetObject, sourceObject, excludedKey, _unused) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys of the source object
    for (const propertyKey of jH4(sourceObject)) {
      // Only copy if the property does not already exist on targetObject and is not the excluded key
      if (!kH4.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Retrieve the property descriptor to preserve enumerability
        const propertyDescriptor = _H4(sourceObject, propertyKey);
        UQ1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !propertyDescriptor || propertyDescriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyPropertiesExcludingKey;
