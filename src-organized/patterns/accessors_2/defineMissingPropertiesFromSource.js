/**
 * Copies properties from a source object to a target object, defining them as getters if they do not already exist on the target.
 * Skips a specific property if specified. Ensures the enumerable flag is preserved if possible.
 *
 * @param {Object} targetObject - The object to which properties will be defined.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} [propertyToSkip] - a property key to skip when copying.
 * @param {any} [descriptorCache] - Used internally to cache property descriptors.
 * @returns {Object} The modified target object with new properties defined as getters.
 */
function defineMissingPropertiesFromSource(targetObject, sourceObject, propertyToSkip, descriptorCache) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all property keys of the source object (including symbols)
    for (const propertyKey of gn6(sourceObject)) {
      // Only define the property if isBlobOrFileLikeObject does not already exist on the target and is not the property to skip
      if (!hn6.call(targetObject, propertyKey) && propertyKey !== propertyToSkip) {
        // Retrieve the property descriptor if available
        descriptorCache = bn6(sourceObject, propertyKey);
        // Define the property on the target object as a getter, preserving enumerability if possible
        CC1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !descriptorCache || descriptorCache.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = defineMissingPropertiesFromSource;