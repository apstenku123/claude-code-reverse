/**
 * Determines if the given observable matches the provided configuration.
 *
 * @param {Observable} sourceObservable - The observable to check.
 * @param {Object} config - The configuration object to match against.
 * @returns {boolean} True if the observable matches the configuration, false otherwise.
 */
function isObservableMatchingConfig(sourceObservable, config) {
  // getHeaderValueCaseInsensitive is assumed to be an external function that checks if the observable matches the config
  // The double negation (!!) ensures the return value is a boolean
  return !!getHeaderValueCaseInsensitive(sourceObservable, config);
}

module.exports = isObservableMatchingConfig;