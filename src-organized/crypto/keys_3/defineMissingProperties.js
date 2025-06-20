/**
 * Defines properties from a source object onto a target object if they are missing.
 *
 * Iterates over all property keys of the source object (including symbols), and for each property that does not exist on the target object and is not the excluded key, defines a getter on the target object that returns the value from the source object. The property is enumerable if the original property descriptor is enumerable or if no descriptor is found.
 *
 * @param {Object} targetObject - The object to which missing properties will be defined.
 * @param {Object|Function} sourceObject - The object from which properties are copied.
 * @param {string|symbol} excludedKey - a property key to exclude from copying.
 * @param {any} propertyDescriptorCache - (Internal use) Used to cache property descriptor during enumeration.
 * @returns {Object} The target object with missing properties defined.
 */
function defineMissingProperties(targetObject, sourceObject, excludedKey, propertyDescriptorCache) {
  // Only proceed if sourceObject is an object or function
  if (
    (sourceObject && typeof sourceObject === "object") ||
    typeof sourceObject === "function"
  ) {
    // Iterate over all property keys (including symbols) of the source object
    for (const propertyKey of $setValueAndProcess(sourceObject)) {
      // Only define the property if isBlobOrFileLikeObject does not exist on the target and is not the excluded key
      if (!qb6.call(targetObject, propertyKey) && propertyKey !== excludedKey) {
        // Get the property descriptor for enumerability check
        propertyDescriptorCache = Nb6(sourceObject, propertyKey);
        oJ1(targetObject, propertyKey, {
          get: () => sourceObject[propertyKey],
          enumerable: !propertyDescriptorCache || propertyDescriptorCache.enumerable
        });
      }
    }
  }
  return targetObject;
}

module.exports = defineMissingProperties;