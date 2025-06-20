/**
 * Selects or transforms an observable source using the provided configuration.
 *
 * This function delegates to the internal `fo1` utility, passing an empty string as the third argument.
 *
 * @param {Observable} sourceObservable - The observable source to select or transform.
 * @param {Object} config - Configuration object that determines how the selection/transformation is performed.
 * @returns {Observable} The resulting observable after applying the selection/transformation.
 */
function selectObservableWithConfig(sourceObservable, config) {
  // Delegate to the internal fo1 utility with an empty string as the third argument
  return fo1(sourceObservable, config, "");
}

module.exports = selectObservableWithConfig;