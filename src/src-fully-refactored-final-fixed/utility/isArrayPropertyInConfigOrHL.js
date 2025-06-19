/**
 * Checks if a given property exists and is an array, either in the cached configuration or in the HL object.
 *
 * If useConfig is true, retrieves the configuration object using getCachedOrFreshConfig(),
 * and checks if the property exists in that object and is an array.
 * If useConfig is false, checks if the property exists in the HL object and is an array.
 *
 * @param {string} propertyName - The name of the property to check for existence and array type.
 * @param {boolean} useConfig - Determines whether to check in the configuration object (true) or HL object (false).
 * @returns {boolean} True if the property exists and is an array in the selected object; otherwise, false.
 */
function isArrayPropertyInConfigOrHL(propertyName, useConfig) {
  if (useConfig) {
    // Retrieve the configuration object (possibly from cache)
    const configObject = getCachedOrFreshConfig();
    // Check if the property exists in the config object and is an array
    return propertyName in configObject && Array.isArray(configObject[propertyName]);
  } else {
    // Check if the property exists in the HL object and is an array
    return propertyName in HL && Array.isArray(HL[propertyName]);
  }
}

module.exports = isArrayPropertyInConfigOrHL;