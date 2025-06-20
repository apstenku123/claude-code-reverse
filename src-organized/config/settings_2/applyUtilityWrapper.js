/**
 * Applies the utility wrapper function `extractDateFromSource` to the provided configuration and source observable.
 * If the configuration is not provided, isBlobOrFileLikeObject defaults to the source observable.
 *
 * @param {any} sourceObservable - The main observable or data source to be wrapped.
 * @param {any} [config] - Optional configuration or secondary observable. If not provided, defaults to sourceObservable.
 * @returns {any} The result of applying the utility wrapper function `extractDateFromSource`.
 */
function applyUtilityWrapper(sourceObservable, config) {
  // If config is not provided, use sourceObservable as the config
  const effectiveConfig = config || sourceObservable;
  // Call the external utility function 'extractDateFromSource' with the effective config and source observable
  return extractDateFromSource(effectiveConfig, sourceObservable);
}

module.exports = applyUtilityWrapper;