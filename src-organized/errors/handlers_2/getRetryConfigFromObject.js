/**
 * Retrieves the retry configuration from the provided object, if available.
 *
 * @param {Object} sourceObject - The object potentially containing a config with retryConfig.
 * @returns {any} The retryConfig property if isBlobOrFileLikeObject exists, otherwise undefined.
 */
function getRetryConfigFromObject(sourceObject) {
  // Check if sourceObject, its config property, and retryConfig exist
  if (sourceObject && sourceObject.config && sourceObject.config.retryConfig) {
    return sourceObject.config.retryConfig;
  }
  // Return undefined if retryConfig is not found
  return undefined;
}

module.exports = getRetryConfigFromObject;