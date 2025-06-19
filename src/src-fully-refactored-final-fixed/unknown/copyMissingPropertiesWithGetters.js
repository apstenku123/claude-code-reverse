/**
 * Copies missing properties from the source object to the target object using getters.
 * Only properties that do not already exist on the target and are not the excluded property are copied.
 * The copied properties are defined as enumerable if the source property descriptor is enumerable.
 *
 * @param {Object} targetObject - The object to which properties will be added.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedProperty - a property key to exclude from copying.
 * @param {any} propertyDescriptorCache - Optional cache or placeholder for property descriptors (used internally).
 * @returns {Object} The modified target object with new properties added.
 */
function copyMissingPropertiesWithGetters(targetObject, sourceObject, excludedProperty, propertyDescriptorCache) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys of sourceObject
    for (const propertyKey of _C4(sourceObject)) {
      // Only copy if property does not exist on targetObject and is not the excludedProperty
      if (!jC4.call(targetObject, propertyKey) && propertyKey !== excludedProperty) {
        // Get the property descriptor for sourceObject[propertyKey]
        const descriptor = SC4(sourceObject, propertyKey);
        // Define the property on targetObject with a getter
        AQ1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !(propertyDescriptorCache = descriptor) || propertyDescriptorCache.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyMissingPropertiesWithGetters;