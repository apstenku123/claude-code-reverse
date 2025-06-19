/**
 * Copies own enumerable properties (including symbols) from a source object to a target object,
 * defining them as getters on the target. Skips properties already present on the target or matching a specific key.
 *
 * @param {Object} targetObject - The object to which properties will be added.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} skipKey - a property key to skip during copying.
 * @param {*} [descriptorCache] - Optional cache for property descriptors (used internally).
 * @returns {Object} The modified target object with new properties defined as getters.
 */
function copyPropertiesWithGetters(targetObject, sourceObject, skipKey, descriptorCache) {
  // Ensure sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys (including symbols)
    for (const propertyKey of Vo9(sourceObject)) {
      // Only add property if isBlobOrFileLikeObject doesn'processRuleBeginHandlers already exist on targetObject and isn'processRuleBeginHandlers the skipKey
      if (!Ko9.call(targetObject, propertyKey) && propertyKey !== skipKey) {
        // Retrieve the property descriptor from the source object
        const propertyDescriptor = Co9(sourceObject, propertyKey);
        // Define the property on the target object as a getter
        S81(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          // Property is enumerable if descriptor is missing or explicitly enumerable
          enumerable: !(descriptorCache = propertyDescriptor) || descriptorCache.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyPropertiesWithGetters;