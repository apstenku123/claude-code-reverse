/**
 * Updates the exception values array in the provided error context by aggregating recent input entries,
 * if the original exception is an instance of Error and exception values exist.
 *
 * @param {Observable} sourceObservable - The source observable related to the error context.
 * @param {Object} config - Configuration object for aggregation or error handling.
 * @param {number} [maxEntries=250] - Maximum number of entries to keep after aggregation.
 * @param {any} inputContext - Additional context or input for aggregation.
 * @param {any} aggregationOptions - Options for the aggregation process.
 * @param {Object} errorContext - The error context containing exception and values arrays.
 * @param {Object} errorDetails - Details about the error, including the original exception.
 * @returns {void}
 */
function updateExceptionValuesWithAggregatedEntry(
  sourceObservable,
  config,
  maxEntries = 250,
  inputContext,
  aggregationOptions,
  errorContext,
  errorDetails
) {
  // Validate that errorContext has exception values and errorDetails has a valid originalException
  if (
    !errorContext.exception ||
    !errorContext.exception.values ||
    !errorDetails ||
    !zE1.isInstanceOf(errorDetails.originalException, Error)
  ) {
    return;
  }

  // Get the most recent exception value, if any
  const exceptionValues = errorContext.exception.values;
  const lastExceptionValue = exceptionValues.length > 0
    ? exceptionValues[exceptionValues.length - 1]
    : undefined;

  if (lastExceptionValue) {
    // Aggregate recent input entries and update the exception values array
    const aggregatedValues = collectErrorChain(
      sourceObservable,
      config,
      aggregationOptions,
      errorDetails.originalException,
      inputContext,
      exceptionValues,
      lastExceptionValue,
      0
    );
    errorContext.exception.values = Kh2(aggregatedValues, maxEntries);
  }
}

module.exports = updateExceptionValuesWithAggregatedEntry;