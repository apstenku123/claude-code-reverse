/**
 * Wraps the provided observable with a utility function, using an optional configuration.
 * If no configuration is provided, the source observable is used as the configuration.
 *
 * @param {any} sourceObservable - The main observable to be wrapped.
 * @param {any} [config] - Optional configuration or observable to override the default behavior.
 * @returns {any} The result of applying the utility function to the configuration and source observable.
 */
function wrapWithUtility(sourceObservable, config) {
  // If config is not provided, use sourceObservable as config
  const effectiveConfig = config || sourceObservable;
  // Call the external utility function 'extractDateFromSource' with the effective config and source observable
  return extractDateFromSource(effectiveConfig, sourceObservable);
}

module.exports = wrapWithUtility;