/**
 * Applies the 'extractDateFromSource' utility function to the provided configuration or, if not provided, to the source observable as both arguments.
 *
 * @param {any} sourceObservable - The primary observable or source object to be used.
 * @param {any} [config] - Optional configuration or override object. If not provided, sourceObservable is used as both arguments.
 * @returns {any} The result of calling 'extractDateFromSource' with the resolved arguments.
 */
function applyUuWithFallback(sourceObservable, config) {
  // If config is not provided, use sourceObservable as both arguments
  const resolvedConfig = config || sourceObservable;
  return extractDateFromSource(resolvedConfig, sourceObservable);
}

module.exports = applyUuWithFallback;