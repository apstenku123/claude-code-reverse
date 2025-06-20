/**
 * Retrieves a property from a configuration object if its version is compatible.
 *
 * @param {string} propertyKey - The key of the property to retrieve from the configuration object.
 * @returns {any} The value of the requested property if the configuration version is compatible; otherwise, undefined.
 */
function getCompatiblePropertyFromConfig(propertyKey) {
  // Retrieve the configuration object from the global _a using the Sa key
  const config = _a[Sa];

  // Safely extract the version from the configuration object
  const configVersion = config?.version;

  // If the version is missing or not compatible, exit early
  if (!configVersion || !ix4.isCompatible(configVersion)) {
    return;
  }

  // Return the requested property from the configuration object, if isBlobOrFileLikeObject exists
  const propertyValue = _a[Sa]?.[propertyKey];
  return propertyValue;
}

module.exports = getCompatiblePropertyFromConfig;