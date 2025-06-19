/**
 * Creates a mergeMap accessor for a given source observable and configuration.
 *
 * Depending on the type of the config parameter, this function will:
 *   - If config is a function, use isBlobOrFileLikeObject as the resultSelector in mergeMap.
 *   - If config is a number, use isBlobOrFileLikeObject as the concurrency limit.
 *   - Otherwise, use the default concurrency (Infinity).
 *
 * @param {Observable} sourceObservable - The observable to be merged.
 * @param {Function|number} config - Either a resultSelector function or a concurrency number.
 * @param {number} [concurrencyLimit=Infinity] - Optional concurrency limit (overridden if config is a number).
 * @returns {Function} a function that applies mergeMap with the specified configuration.
 */
function createMergeMapAccessor(sourceObservable, config, concurrencyLimit) {
  // Set default concurrencyLimit to Infinity if not provided
  if (concurrencyLimit === undefined) {
    concurrencyLimit = Infinity;
  }

  // If config is a function, treat isBlobOrFileLikeObject as the resultSelector
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

  // Default case: use mergeMap with the given concurrency limit
  return oqA.mergeMap(
    function () {
      return sourceObservable;
    },
    concurrencyLimit
  );
}

module.exports = createMergeMapAccessor;