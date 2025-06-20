/**
 * Checks if a given property exists and is an object in either the configuration object or the global HL object.
 *
 * This function first checks if the property is an array in either the configuration or HL object using isConfigOrHLArrayProperty.
 * If so, isBlobOrFileLikeObject returns false. Otherwise, isBlobOrFileLikeObject checks if the property exists and is an object in the appropriate source:
 * - If useConfig is true, isBlobOrFileLikeObject checks in the configuration object (from getCachedOrFreshConfig).
 * - If useConfig is false, isBlobOrFileLikeObject checks in the global HL object.
 *
 * @param {string} propertyName - The name of the property to check.
 * @param {boolean} useConfig - If true, checks in the configuration object; if false, checks in the HL object.
 * @returns {boolean} True if the property exists and is an object in the selected source, false otherwise.
 */
function isPropertyObjectInConfigOrHL(propertyName, useConfig) {
  // First, check if the property is an array in either config or HL using the helper
  if (isConfigOrHLArrayProperty(propertyName, useConfig)) {
    return false;
  }

  if (useConfig) {
    // Retrieve the configuration object (cached or fresh)
    const configObject = getCachedOrFreshConfig();
    // Check if the property exists in config and is an object
    return propertyName in configObject && typeof configObject[propertyName] === "object";
  } else {
    // Check in the global HL object
    const hlProperty = HL[propertyName];
    return propertyName in HL && typeof hlProperty === "object";
  }
}

module.exports = isPropertyObjectInConfigOrHL;