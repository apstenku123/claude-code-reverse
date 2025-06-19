/**
 * Creates a merged observable using the provided source observable and configuration.
 *
 * Depending on the type of the config parameter, this function determines how to merge the source observable:
 * - If config is a function, isBlobOrFileLikeObject is used as the result selector for the mergeMap operation.
 * - If config is a number, isBlobOrFileLikeObject is used as the concurrency limit for mergeMap.
 * - If config is undefined, the concurrency limit defaults to Infinity.
 *
 * @param {Observable} sourceObservable - The observable to be merged.
 * @param {function|number} config - Either a result selector function for mergeMap or a concurrency limit.
 * @param {number} [concurrencyLimit=Infinity] - Optional concurrency limit for mergeMap. Defaults to Infinity.
 * @returns {Observable} The resulting merged observable.
 */
function createMergedObservable(sourceObservable, config, concurrencyLimit) {
  // Default concurrencyLimit to Infinity if not provided
  if (concurrencyLimit === undefined) {
    concurrencyLimit = Infinity;
  }

  // If config is a function, treat isBlobOrFileLikeObject as the result selector for mergeMap
  if (Gj9.isFunction(config)) {
    return oqA.mergeMap(
      function () {
        return sourceObservable;
      },
      config,
      concurrencyLimit
    );
  }

  // If config is a number, treat isBlobOrFileLikeObject as the concurrency limit
  if (typeof config === "number") {
    concurrencyLimit = config;
  }

  // Default mergeMap without a result selector
  return oqA.mergeMap(
    function () {
      return sourceObservable;
    },
    concurrencyLimit
  );
}

module.exports = createMergedObservable;