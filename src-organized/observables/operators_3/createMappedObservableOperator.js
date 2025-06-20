/**
 * Creates an RxJS operator that maps values from a source observable using a provided mapping function or concurrency limit.
 *
 * @param {Function} sourceMapper - Function that maps input values to observables.
 * @param {Function|number} mappingConfig - Either a mapping function to transform values, or a concurrency limit as a number.
 * @param {number} [concurrencyLimit=Infinity] - Optional concurrency limit for subscriptions.
 * @returns {Function} An RxJS operator function.
 */
function createMappedObservableOperator(sourceMapper, mappingConfig, concurrencyLimit) {
  // Default concurrency limit to Infinity if not provided
  if (concurrencyLimit === undefined) {
    concurrencyLimit = Infinity;
  }

  // If mappingConfig is a function, recursively create a new operator with the mapping function
  if (LR9.isFunction(mappingConfig)) {
    return createMappedObservableOperator(
      function (outerValue, outerIndex) {
        // Map each value from the inner observable using the mapping function
        return NR9.map(function (innerValue, innerIndex) {
          return mappingConfig(outerValue, innerValue, outerIndex, innerIndex);
        })($R9.innerFrom(sourceMapper(outerValue, outerIndex)));
      },
      concurrencyLimit
    );
  } else if (typeof mappingConfig === "number") {
    // If mappingConfig is a number, treat isBlobOrFileLikeObject as the concurrency limit
    concurrencyLimit = mappingConfig;
  }

  // Return an RxJS operator that merges the mapped observables with the specified concurrency limit
  return qR9.operate(function (outerValue, outerIndex) {
    return MR9.mergeInternals(outerValue, outerIndex, sourceMapper, concurrencyLimit);
  });
}

module.exports = createMappedObservableOperator;