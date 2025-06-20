/**
 * Validates that the provided configuration object contains an SDK key.
 * Logs a warning if the SDK key is missing and prevents further processing.
 *
 * @param {Object} config - The configuration object to validate.
 * @param {string} config.sdkKey - The SDK key required for making requests.
 * @returns {boolean} Returns true if the SDK key is present; otherwise, logs a warning and returns false.
 */
const validateSdkKeyPresence = (config) => {
  // Check if the SDK key exists in the configuration object
  if (!config.sdkKey) {
    // Log a warning if the SDK key is missing
    yP.Log.warn("Unable to make request without an SDK key");
    return false;
  }
  // SDK key is present; validation successful
  return true;
};

module.exports = validateSdkKeyPresence;