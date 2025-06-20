/**
 * Checks if the 'K_CONFIGURATION' environment variable is set.
 *
 * @returns {boolean} True if 'K_CONFIGURATION' exists in process.env, otherwise false.
 */
function isKConfigurationSet() {
  // Double negation (!!) converts the value to a boolean:
  // true if process.env.K_CONFIGURATION is defined and truthy, false otherwise.
  return !!process.env.K_CONFIGURATION;
}

module.exports = isKConfigurationSet;