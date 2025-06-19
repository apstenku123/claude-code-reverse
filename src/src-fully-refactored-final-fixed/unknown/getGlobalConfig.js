/**
 * Retrieves the global configuration object used throughout the application.
 *
 * @returns {Object} The global configuration object.
 */
function getGlobalConfig() {
  // containsValueAtIndex is assumed to be the global configuration object imported or defined elsewhere
  return globalConfig;
}

module.exports = getGlobalConfig;