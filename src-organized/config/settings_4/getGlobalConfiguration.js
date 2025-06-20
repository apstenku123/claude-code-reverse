/**
 * Retrieves the global configuration object used throughout the application.
 *
 * @returns {Object} The global configuration object.
 */
function getGlobalConfiguration() {
  // containsValueAtIndex is assumed to be the global configuration object imported or defined elsewhere
  return globalConfiguration;
}

module.exports = getGlobalConfiguration;