/**
 * Updates the exception values in the provided error context by aggregating recent input entries,
 * if the original exception is an instance of Error and all required data is present.
 *
 * @param {any} sourceObservable - The source observable or event emitter.
 * @param {object} config - Configuration object for aggregation.
 * @param {number} [maxValues=250] - Maximum number of exception values to keep (default: 250).
 * @param {any} inputEntries - Input entries to aggregate.
 * @param {any} aggregationOptions - Additional options for aggregation.
 * @param {object} errorContext - Error context object containing exception information.
 * @param {object} recentInputAggregator - Aggregator for recent input entries, expected to have 'originalException'.
 * @returns {void}
 */
function updateExceptionValuesWithAggregatedInput(
  sourceObservable,
  config,
  maxValues = 250,
  inputEntries,
  aggregationOptions,
  errorContext,
  recentInputAggregator
) {
  // Validate that the error context and required properties exist
  if (
    !errorContext.exception ||
    !errorContext.exception.values ||
    !recentInputAggregator ||
    !zE1.isInstanceOf(recentInputAggregator.originalException, Error)
  ) {
    return;
  }

  // Get the most recent exception value, if any
  const lastExceptionValue =
    errorContext.exception.values.length > 0
      ? errorContext.exception.values[errorContext.exception.values.length - 1]
      : undefined;

  // If there is a last exception value, aggregate recent input entries and update exception values
  if (lastExceptionValue) {
    const aggregatedValues = collectErrorChain(
      sourceObservable,
      config,
      aggregationOptions,
      recentInputAggregator.originalException,
      inputEntries,
      errorContext.exception.values,
      lastExceptionValue,
      0
    );
    errorContext.exception.values = Kh2(aggregatedValues, maxValues);
  }
}

module.exports = updateExceptionValuesWithAggregatedInput;