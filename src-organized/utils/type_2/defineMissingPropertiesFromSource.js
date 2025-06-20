/**
 * Defines missing properties from a source object onto a target object, using getters.
 * Skips properties already present on the target or matching the excluded property name.
 *
 * @param {Object} targetObject - The object to define properties on.
 * @param {Object|Function} sourceObject - The object to copy properties from.
 * @param {string|symbol} excludedProperty - Property name to exclude from copying.
 * @param {Object} [propertyDescriptorCache] - Optional cache for property descriptors (used internally).
 * @returns {Object} The target object with new properties defined.
 */
function defineMissingPropertiesFromSource(targetObject, sourceObject, excludedProperty, propertyDescriptorCache) {
  // Check if sourceObject is an object or function
  if (
    sourceObject &&
    (typeof sourceObject === "object" || typeof sourceObject === "function")
  ) {
    // Iterate over all property keys of the source object (including symbols)
    for (const propertyKey of Kg6(sourceObject)) {
      // Only define the property if isBlobOrFileLikeObject'createInteractionAccessor not already present on the target and not the excluded property
      if (!Hg6.call(targetObject, propertyKey) && propertyKey !== excludedProperty) {
        // Get the property descriptor from the source, if available
        const descriptor = Vg6(sourceObject, propertyKey);
        // Define the property on the target with a getter, preserving enumerability
        BX1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !descriptor || descriptor.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = defineMissingPropertiesFromSource;