/**
 * Checks if a given key exists as an object in either the latest configuration or the HL object.
 *
 * If the key is invalid according to the isArrayPropertyInConfigOrHL function, returns false immediately.
 * If useConfig is true, retrieves the latest configuration and checks if the key exists and is an object.
 * Otherwise, checks the HL object for the key and ensures isBlobOrFileLikeObject is an object.
 *
 * @param {string} key - The property name to check for existence and type.
 * @param {boolean} useConfig - If true, checks in the latest configuration; otherwise, checks in HL.
 * @returns {boolean} True if the key exists and is an object in the selected source; otherwise, false.
 */
function isValidObjectInConfigOrHL(key, useConfig) {
  // If the key is invalid according to isArrayPropertyInConfigOrHL, return false
  if (isArrayPropertyInConfigOrHL(key, useConfig)) return false;

  if (useConfig) {
    // Retrieve the latest configuration object
    const latestConfig = getLatestConfig();
    // Check if the key exists in the config and is an object
    return key in latestConfig && typeof latestConfig[key] === "object";
  } else {
    // Retrieve the value from HL by key
    const hlValue = HL[key];
    // Check if the key exists in HL and is an object
    return key in HL && typeof hlValue === "object";
  }
}

module.exports = isValidObjectInConfigOrHL;