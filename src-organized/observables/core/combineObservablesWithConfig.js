/**
 * Combines a source observable with a configuration using the fo1 utility function.
 *
 * @param {Observable} sourceObservable - The observable to be combined.
 * @param {Object} config - Configuration options for combining the observable.
 * @returns {Observable} The result of combining the source observable with the configuration.
 */
function combineObservablesWithConfig(sourceObservable, config) {
  // The third argument is an empty string, as required by fo1'createInteractionAccessor signature
  return fo1(sourceObservable, config, "");
}

module.exports = combineObservablesWithConfig;