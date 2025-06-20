/**
 * Checks if a given key exists as an object in either the configuration object or the HL object.
 *
 * If the key is invalid according to the isArrayPropertyInConfigOrHL function, returns false immediately.
 * If useConfig is true, checks the configuration object (from getCachedOrFreshConfig).
 * Otherwise, checks the HL object.
 *
 * @param {string} key - The key to check for existence as an object.
 * @param {boolean} useConfig - If true, checks the configuration object; otherwise, checks HL.
 * @returns {boolean} True if the key exists and its value is an object; false otherwise.
 */
function isKeyObjectInConfigOrHL(key, useConfig) {
  // Return false immediately if the key is invalid according to isArrayPropertyInConfigOrHL
  if (isArrayPropertyInConfigOrHL(key, useConfig)) return false;

  if (useConfig) {
    // Retrieve the configuration object (cached or fresh)
    const configObject = getCachedOrFreshConfig();
    // Check if the key exists in the config object and its value is an object
    return key in configObject && typeof configObject[key] === "object";
  } else {
    // Retrieve the value from HL by key
    const hlValue = HL[key];
    // Check if the key exists in HL and its value is an object
    return key in HL && typeof hlValue === "object";
  }
}

module.exports = isKeyObjectInConfigOrHL;