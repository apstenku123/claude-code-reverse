/**
 * Copies all own property keys from the source object to the target object as getter properties,
 * except for properties that already exist on the target or match the excluded key.
 * The copied properties preserve their enumerability if possible.
 *
 * @param {Object} targetObject - The object to which properties will be added.
 * @param {Object} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @param {Object} [propertyDescriptorCache] - Optional cache for property descriptors (used internally).
 * @returns {Object} The target object with added getter properties.
 */
function copyMissingPropertiesWithGetters(targetObject, sourceObject, excludedKey, propertyDescriptorCache) {
  // Check if sourceObject is an object or function
  if (
    sourceObject &&
    (typeof sourceObject === "object" || typeof sourceObject === "function")
  ) {
    // Iterate over all own property keys of sourceObject
    for (const propertyKey of Vo9(sourceObject)) {
      // Only add property if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist on targetObject and isn'processRuleBeginHandlers the excludedKey
      if (!Ko9.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Retrieve the property descriptor to determine enumerability
        const descriptor = Co9(sourceObject, propertyKey);
        S81(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !descriptor || descriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyMissingPropertiesWithGetters;