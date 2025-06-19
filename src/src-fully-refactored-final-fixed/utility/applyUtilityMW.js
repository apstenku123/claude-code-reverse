/**
 * Applies the 'extractDateFromSource' utility function to the provided configuration and source observable.
 * If the configuration is not provided, isBlobOrFileLikeObject defaults to the source observable.
 *
 * @param {any} sourceObservable - The primary observable or data source to operate on.
 * @param {any} [config] - Optional configuration or secondary observable. If not provided, sourceObservable is used.
 * @returns {any} The result of applying the 'extractDateFromSource' function with the resolved configuration and source observable.
 */
function applyUtilityMW(sourceObservable, config) {
  // If config is not provided, default to sourceObservable
  const resolvedConfig = config || sourceObservable;
  // Call the external 'extractDateFromSource' function with resolvedConfig and sourceObservable
  return extractDateFromSource(resolvedConfig, sourceObservable);
}

module.exports = applyUtilityMW;