/**
 * Determines if exposure logging should be skipped based on the provided config object.
 *
 * Exposure logging is skipped if the config is null/undefined, or if the 'disableExposureLog' property is explicitly set to false.
 *
 * @param {Object|null|undefined} config - The configuration object that may contain the 'disableExposureLog' property.
 * @returns {boolean} Returns true if exposure logging should be skipped, otherwise false.
 */
function shouldSkipExposureLog(config) {
  // Exposure logging is skipped if config is null/undefined,
  // or if disableExposureLog is explicitly set to false
  return config == null || config.disableExposureLog === false;
}

module.exports = shouldSkipExposureLog;