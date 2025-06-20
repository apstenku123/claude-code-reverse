/**
 * Checks if the 'optionAsMetaKey' feature is installed in the current configuration.
 *
 * This function retrieves the latest configuration (from cache or disk)
 * and returns a boolean indicating whether the 'optionAsMetaKeyInstalled' flag is enabled.
 *
 * @returns {boolean} True if 'optionAsMetaKeyInstalled' is enabled, otherwise false.
 */
function isOptionAsMetaKeyInstalled() {
  // Retrieve the current configuration object (cached or fresh)
  const config = getCachedOrFreshConfig();
  // Return true if the 'optionAsMetaKeyInstalled' flag is set to true
  return config.optionAsMetaKeyInstalled === true;
}

module.exports = isOptionAsMetaKeyInstalled;