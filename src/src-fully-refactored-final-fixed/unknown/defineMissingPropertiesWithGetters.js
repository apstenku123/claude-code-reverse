/**
 * Defines missing properties from a source object onto a target object using getters.
 *
 * For each own property key of the source object (configObject), if the target object (targetObject)
 * does not already have that property and the key is not the excludedKey, a getter is defined on the target
 * that returns the value from the source. The property is enumerable if the source property descriptor is
 * either missing or marked as enumerable.
 *
 * @param {Object} targetObject - The object to define missing properties on.
 * @param {Object|Function} configObject - The source object whose properties are to be defined on the target.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @param {any} propertyDescriptorCache - (Unused except for temporary assignment) Used to store property descriptor.
 * @returns {Object} The target object with new properties defined as getters.
 */
function defineMissingPropertiesWithGetters(targetObject, configObject, excludedKey, propertyDescriptorCache) {
  // Only proceed if configObject is an object or function
  if ((configObject && typeof configObject === "object") || typeof configObject === "function") {
    // Iterate over all own property keys of configObject
    for (const propertyKey of oe9(configObject)) {
      // Only define the property if isBlobOrFileLikeObject does not exist on targetObject and is not the excludedKey
      if (!te9.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor from configObject
        propertyDescriptorCache = re9(configObject, propertyKey);
        // Define the property on targetObject as a getter
        i81(targetObject, propertyKey, {
          get: () => configObject[propertyKey],
          // Property is enumerable if descriptor is missing or marked enumerable
          enumerable: !(propertyDescriptorCache) || propertyDescriptorCache.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = defineMissingPropertiesWithGetters;