/**
 * Determines whether exposure logging is disabled for the given configuration object.
 *
 * This function checks if the provided configuration object is null/undefined,
 * or if its `disableExposureLog` property is explicitly set to `false`.
 *
 * @param {Object|null|undefined} config - The configuration object to check.
 * @returns {boolean} Returns true if the config is null/undefined or if exposure logging is explicitly enabled (i.e., disableExposureLog is false).
 */
function isExposureLoggingDisabled(config) {
  // Return true if config is null or undefined
  // OR if disableExposureLog is explicitly set to false
  return config == null || config.disableExposureLog === false;
}

module.exports = isExposureLoggingDisabled;