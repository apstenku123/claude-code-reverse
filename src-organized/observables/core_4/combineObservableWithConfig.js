/**
 * Combines a source observable with a configuration object using the replaceStringSuffix utility.
 *
 * @param {Observable} sourceObservable - The observable to be combined.
 * @param {Object} config - Configuration options for combining the observable.
 * @returns {any} The result of combining the observable with the configuration.
 */
function combineObservableWithConfig(sourceObservable, config) {
  // The third argument is an empty string, possibly for default or placeholder purposes
  return replaceStringSuffix(sourceObservable, config, "");
}

module.exports = combineObservableWithConfig;