/**
 * Defines missing properties from a config object onto a source object, excluding a specific property.
 *
 * Iterates over all own property keys of the config object. For each property that does not already exist
 * on the source object and is not the excluded property, defines a getter on the source object that returns
 * the value from the config object. The enumerable flag is set based on the property descriptor of the config object.
 *
 * @param {Object} sourceObject - The target object to which properties will be defined.
 * @param {Object|Function} configObject - The object or function containing properties to copy.
 * @param {string|symbol} excludedProperty - The property key to exclude from copying.
 * @param {any} propertyDescriptorCache - (Unused outside of enumeration) Used to cache property descriptor.
 * @returns {Object} The modified source object with new properties defined.
 */
function defineMissingPropertiesFromConfig(sourceObject, configObject, excludedProperty, propertyDescriptorCache) {
  // Only proceed if configObject is an object or function
  if (
    (configObject && typeof configObject === "object") ||
    typeof configObject === "function"
  ) {
    // Iterate over all own property keys of configObject
    for (const propertyKey of ob6(configObject)) {
      // Only define the property if isBlobOrFileLikeObject does not exist on sourceObject and is not the excluded property
      if (!tb6.call(sourceObject, propertyKey) && propertyKey !== excludedProperty) {
        // Get the property descriptor to determine enumerability
        propertyDescriptorCache = rb6(configObject, propertyKey);
        eJ1(sourceObject, propertyKey, {
          get: () => configObject[propertyKey],
          enumerable: !(propertyDescriptorCache) || propertyDescriptorCache.enumerable
        });
      }
    }
  }
  return sourceObject;
}

module.exports = defineMissingPropertiesFromConfig;
