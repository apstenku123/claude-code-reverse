/**
 * Applies a mergeMap operation to the provided source observable, using either a configuration function or a concurrency limit.
 *
 * @param {Observable} sourceObservable - The observable to which mergeMap will be applied.
 * @param {Function|number} config - Either a projection function (if a function) or a concurrency limit (if a number).
 * @param {number} [concurrencyLimit=Infinity] - The maximum number of concurrent subscriptions. Defaults to Infinity if not provided.
 * @returns {Observable} The resulting observable after applying mergeMap with the specified configuration.
 */
function getNumber(sourceObservable, config, concurrencyLimit) {
  // Default concurrencyLimit to Infinity if not provided
  if (concurrencyLimit === undefined) {
    concurrencyLimit = Infinity;
  }

  // If config is a function, use isBlobOrFileLikeObject as the projection function in mergeMap
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

  // Apply mergeMap with the source observable and concurrency limit
  return oqA.mergeMap(
    function () {
      return sourceObservable;
    },
    concurrencyLimit
  );
}

module.exports = getNumber;