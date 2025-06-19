/**
 * Determines whether exposure logging should be skipped based on the provided configuration object.
 *
 * Exposure logging is skipped if the configuration object is null/undefined,
 * or if its 'disableExposureLog' property is explicitly set to false.
 *
 * @param {Object|null|undefined} config - The configuration object to check for exposure logging settings.
 * @returns {boolean} Returns true if exposure logging should be skipped; otherwise, false.
 */
function shouldSkipExposureLogging(config) {
  // Skip exposure logging if config is null/undefined,
  // or if disableExposureLog is explicitly set to false
  return config == null || config.disableExposureLog === false;
}

module.exports = shouldSkipExposureLogging;