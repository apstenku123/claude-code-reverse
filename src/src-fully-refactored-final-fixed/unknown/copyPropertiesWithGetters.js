/**
 * Copies enumerable properties from a source object to a target object using getters.
 * Properties are only copied if they do not already exist on the target and are not equal to the excludedProperty.
 *
 * @param {Object} targetObject - The object to which properties will be added.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedProperty - a property name to exclude from copying.
 * @param {any} propertyDescriptorCache - Used to cache the property descriptor during enumeration.
 * @returns {Object} The modified target object with copied properties.
 */
function copyPropertiesWithGetters(targetObject, sourceObject, excludedProperty, propertyDescriptorCache) {
  // Ensure sourceObject is an object or function before proceeding
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all property keys of the sourceObject
    for (const propertyKey of Vi6(sourceObject)) {
      // Only copy if property does not exist on targetObject and is not the excludedProperty
      if (!Ki6.call(targetObject, propertyKey) && propertyKey !== excludedProperty) {
        // Get the property descriptor for the current property
        propertyDescriptorCache = Ci6(sourceObject, propertyKey);
        // Define the property on the targetObject with a getter
        sX1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          // Property is enumerable if descriptor is missing or explicitly enumerable
          enumerable: !propertyDescriptorCache || propertyDescriptorCache.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyPropertiesWithGetters;
