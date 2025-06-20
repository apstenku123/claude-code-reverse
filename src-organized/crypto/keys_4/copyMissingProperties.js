/**
 * Copies all own property keys from the source object to the target object,
 * except for a specified excluded key and any keys already present on the target.
 * Properties are defined with getters that reference the source object.
 *
 * @param {Object} targetObject - The object to which properties will be added.
 * @param {Object} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @param {Object} [propertyDescriptorCache] - Optional cache for property descriptors.
 * @returns {Object} The modified target object with new properties added.
 */
function copyMissingProperties(targetObject, sourceObject, excludedKey, propertyDescriptorCache) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys of the source object
    for (const propertyKey of ffindInStoreWithCallback(sourceObject)) {
      // Skip if the property already exists on the target or is the excluded key
      if (!vfindInStoreWithCallback.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Retrieve the property descriptor from the source object
        let descriptor = xfindInStoreWithCallback(sourceObject, propertyKey);
        // Define the property on the target with a getter referencing the source
        gQ1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          // Property is enumerable if descriptor is missing or explicitly enumerable
          enumerable: !(descriptor) || descriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyMissingProperties;
