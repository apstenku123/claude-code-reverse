/**
 * Checks if a given property exists and is an object in either the configuration object or the HL object.
 *
 * This function first checks if the property is an array in either the configuration or HL object using isArrayPropertyInConfigOrHL.
 * If not, isBlobOrFileLikeObject then checks if the property exists and is an object in the selected source (configuration or HL object).
 *
 * @param {string} propertyName - The name of the property to check.
 * @param {boolean} useConfig - If true, checks in the configuration object; otherwise, checks in the HL object.
 * @returns {boolean} Returns true if the property exists and is an object in the selected source, false otherwise.
 */
function isObjectPropertyInConfigOrHL(propertyName, useConfig) {
  // If the property is an array in either config or HL, return false
  if (isArrayPropertyInConfigOrHL(propertyName, useConfig)) return false;

  if (useConfig) {
    // Retrieve the configuration object (cached or fresh)
    const configObject = getCachedOrFreshConfig();
    // Check if the property exists in config and is an object
    return propertyName in configObject && typeof configObject[propertyName] === "object";
  } else {
    // Check in the HL object
    const hlProperty = HL[propertyName];
    return propertyName in HL && typeof hlProperty === "object";
  }
}

module.exports = isObjectPropertyInConfigOrHL;