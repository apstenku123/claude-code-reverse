/**
 * Creates an RxJS operator that merges values from a source observable with configurable concurrency or mapping logic.
 *
 * If the config parameter is a function, isBlobOrFileLikeObject applies the function to each emission from the source observable,
 * mapping and flattening the results with a concurrency limit. If config is a number, isBlobOrFileLikeObject is used as the concurrency limit.
 *
 * @param {Function} sourceObservableFactory - a function that returns an observable for a given input and context.
 * @param {Function|number} config - Either a mapping function to apply to each emission, or a concurrency limit as a number.
 * @param {number} [concurrencyLimit=Infinity] - Optional maximum number of concurrent inner subscriptions.
 * @returns {Function} An RxJS operator function to be used in a pipe.
 */
function createMergedObservableOperator(sourceObservableFactory, config, concurrencyLimit) {
  // Default concurrency limit to Infinity if not provided
  if (concurrencyLimit === undefined) {
    concurrencyLimit = Infinity;
  }

  // If config is a function, recursively create a merged operator with mapping logic
  if (LR9.isFunction(config)) {
    return createMergedObservableOperator(
      function mappedSource(input, context) {
        // For each emission, map and flatten the results
        return NR9.map(function (value, index) {
          return config(input, value, context, index);
        })($R9.innerFrom(sourceObservableFactory(input, context)));
      },
      concurrencyLimit
    );
  } else if (typeof config === "number") {
    // If config is a number, treat isBlobOrFileLikeObject as the concurrency limit
    concurrencyLimit = config;
  }

  // Return an RxJS operator function that merges internals with the specified concurrency
  return qR9.operate(function (input, context) {
    return MR9.mergeInternals(input, context, sourceObservableFactory, concurrencyLimit);
  });
}

module.exports = createMergedObservableOperator;