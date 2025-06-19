/**
 * Copies all own property keys (including symbols) from the source object to the target object,
 * except for a specified excluded key. Properties are defined as getters on the target, mirroring
 * enumerability from the source. If the property already exists on the target, isBlobOrFileLikeObject is skipped.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @returns {Object} The target object with copied properties.
 */
function copyPropertiesExceptKey(targetObject, sourceObject, excludedKey) {
  // Check if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys (including symbols)
    for (const propertyKey of iB4(sourceObject)) {
      // Skip if property already exists on target or is the excluded key
      if (!nB4.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor from the source
        const propertyDescriptor = lB4(sourceObject, propertyKey);
        // Define the property on the target as a getter, preserving enumerability
        aB1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !propertyDescriptor || propertyDescriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyPropertiesExceptKey;
