/**
 * Copies enumerable properties from the source object to the target object,
 * excluding properties that already exist on the target or match a specified key.
 * Properties are defined with getters that reference the source object.
 *
 * @param {Object} targetObject - The object to which properties will be added.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @param {Object} [propertyDescriptor] - Optional property descriptor (used internally).
 * @returns {Object} The updated target object.
 */
function copyMissingProperties(targetObject, sourceObject, excludedKey, propertyDescriptor) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all own property keys of the sourceObject
    for (const propertyKey of US6(sourceObject)) {
      // Skip if property already exists on targetObject or matches the excludedKey
      if (!NS6.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor for the current property
        const descriptor = ES6(sourceObject, propertyKey);
        // Define the property on the targetObject with a getter referencing sourceObject
        IJ1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          // Property is enumerable if descriptor is missing or explicitly enumerable
          enumerable: !(propertyDescriptor = descriptor) || propertyDescriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = copyMissingProperties;