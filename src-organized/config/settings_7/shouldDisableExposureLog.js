/**
 * Determines if exposure logging should be disabled based on the provided configuration object.
 *
 * @param {Object|null|undefined} config - The configuration object that may contain the disableExposureLog property.
 * @returns {boolean} Returns true if the config is null/undefined or if disableExposureLog is explicitly set to false.
 */
function shouldDisableExposureLog(config) {
  // If config is null or undefined, or if disableExposureLog is exactly false, return true
  return config == null || config.disableExposureLog === false;
}

module.exports = shouldDisableExposureLog;