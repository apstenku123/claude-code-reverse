/**
 * Determines whether exposure logging should be performed based on the provided configuration object.
 *
 * @param {Object|null|undefined} config - The configuration object that may contain the 'disableExposureLog' property.
 * @returns {boolean} Returns true if the config is null/undefined or if 'disableExposureLog' is explicitly set to false; otherwise, returns false.
 */
function shouldLogExposure(config) {
  // If config is null or undefined, or if disableExposureLog is explicitly set to false, allow exposure logging
  return config == null || config.disableExposureLog === false;
}

module.exports = shouldLogExposure;