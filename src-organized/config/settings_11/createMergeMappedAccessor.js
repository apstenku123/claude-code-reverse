/**
 * Creates a merge-mapped accessor function for observables.
 *
 * Depending on the type of the 'config' parameter, this function configures the concurrency
 * or uses a result selector for the mergeMap operation. If 'config' is a function, isBlobOrFileLikeObject is used
 * as the result selector and 'maxConcurrency' is used as the concurrency limit. If 'config' is
 * a number, isBlobOrFileLikeObject is used as the concurrency limit. Otherwise, the default concurrency is Infinity.
 *
 * @param {Observable} sourceObservable - The observable to be merged.
 * @param {Function|number} config - Either a result selector function or a concurrency limit.
 * @param {number} [maxConcurrency=Infinity] - The maximum number of concurrent subscriptions.
 * @returns {OperatorFunction} The merge-mapped accessor operator function.
 */
function createMergeMappedAccessor(sourceObservable, config, maxConcurrency) {
  // Set default concurrency to Infinity if not provided
  if (maxConcurrency === undefined) {
    maxConcurrency = Infinity;
  }

  // If config is a function, treat isBlobOrFileLikeObject as a result selector
  if (Gj9.isFunction(config)) {
    return oqA.mergeMap(
      // Project function: always returns the source observable
      function () {
        return sourceObservable;
      },
      config, // Result selector
      maxConcurrency // Concurrency limit
    );
  }

  // If config is a number, treat isBlobOrFileLikeObject as the concurrency limit
  if (typeof config === "number") {
    maxConcurrency = config;
  }

  // Default case: no result selector, just mergeMap with concurrency
  return oqA.mergeMap(
    function () {
      return sourceObservable;
    },
    maxConcurrency
  );
}

module.exports = createMergeMappedAccessor;
