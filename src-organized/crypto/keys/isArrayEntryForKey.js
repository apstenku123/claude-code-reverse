/**
 * Checks whether the specified key exists and its value is an array, either in the cached config or in the HL object.
 *
 * If useCachedConfig is true, retrieves the config object via getCachedConfig() and checks if the key exists and is an array.
 * Otherwise, checks the HL object for the key and verifies if its value is an array.
 *
 * @param {string} key - The key to check for in the config or HL object.
 * @param {boolean} useCachedConfig - Determines whether to use the cached config (true) or HL object (false).
 * @returns {boolean} True if the key exists and its value is an array in the selected source; otherwise, false.
 */
function isArrayEntryForKey(key, useCachedConfig) {
  if (useCachedConfig) {
    // Retrieve the cached configuration object
    const cachedConfig = getCachedConfig();
    // Check if the key exists in the config and its value is an array
    return key in cachedConfig && Array.isArray(cachedConfig[key]);
  } else {
    // Retrieve the value from the HL object
    const hlValue = HL[key];
    // Check if the key exists in HL and its value is an array
    return key in HL && Array.isArray(hlValue);
  }
}

module.exports = isArrayEntryForKey;