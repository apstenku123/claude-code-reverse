/**
 * Checks if a given property exists and is an array in either the configuration object (from cache or fresh) or the global HL object.
 *
 * If 'useConfig' is true, retrieves the configuration object using getCachedOrFreshConfig(),
 * then checks if the property exists and is an array.
 * Otherwise, checks the HL object for the same.
 *
 * @param {string} propertyName - The name of the property to check for array existence.
 * @param {boolean} useConfig - If true, checks in the configuration object; otherwise, checks in HL.
 * @returns {boolean} True if the property exists and is an array in the selected object, false otherwise.
 */
function isConfigOrHLArrayProperty(propertyName, useConfig) {
  if (useConfig) {
    // Retrieve the configuration object (cached or fresh)
    const configObject = getCachedOrFreshConfig();
    // Check if the property exists in configObject and is an array
    return propertyName in configObject && Array.isArray(configObject[propertyName]);
  } else {
    // Check if the property exists in HL and is an array
    const hlProperty = HL[propertyName];
    return propertyName in HL && Array.isArray(hlProperty);
  }
}

module.exports = isConfigOrHLArrayProperty;