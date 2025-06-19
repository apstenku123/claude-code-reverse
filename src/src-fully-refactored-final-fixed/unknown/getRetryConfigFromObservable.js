/**
 * Retrieves the retry configuration from a given observable object, if available.
 *
 * @param {Object} observable - The observable object that may contain a config with retryConfig.
 * @returns {Object|undefined} The retryConfig object if present, otherwise undefined.
 */
function getRetryConfigFromObservable(observable) {
  // Check if observable, its config, and retryConfig exist
  if (observable && observable.config && observable.config.retryConfig) {
    return observable.config.retryConfig;
  }
  // Return undefined if retryConfig is not found
  return undefined;
}

module.exports = getRetryConfigFromObservable;
