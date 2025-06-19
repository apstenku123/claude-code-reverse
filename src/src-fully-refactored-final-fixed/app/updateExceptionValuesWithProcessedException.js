/**
 * Updates the exception values array in the provided error context by processing the most recent exception value,
 * if all validation checks pass. The function uses external utilities to process and update the exception values.
 *
 * @param {any} sourceObservable - The source observable or context related to the error.
 * @param {any} config - Configuration or context object used in processing.
 * @param {number} [maxValues=250] - Maximum number of exception values to retain after processing.
 * @param {any} additionalInfo - Additional information or context for processing.
 * @param {any} globalContext - Global context or state object.
 * @param {object} errorContext - The error context object containing exception details.
 * @param {object} errorWrapper - The wrapper object containing the original exception.
 * @returns {void}
 */
function updateExceptionValuesWithProcessedException(
  sourceObservable,
  config,
  maxValues = 250,
  additionalInfo,
  globalContext,
  errorContext,
  errorWrapper
) {
  // Validate that the error context and exception values exist, and the errorWrapper contains a valid Error instance
  if (
    !errorContext.exception ||
    !errorContext.exception.values ||
    !errorWrapper ||
    !zE1.isInstanceOf(errorWrapper.originalException, Error)
  ) {
    return;
  }

  // Get the most recent exception value, if any
  const exceptionValues = errorContext.exception.values;
  const mostRecentExceptionValue = exceptionValues.length > 0
    ? exceptionValues[exceptionValues.length - 1]
    : undefined;

  // If a recent exception value exists, process and update the exception values array
  if (mostRecentExceptionValue) {
    // collectErrorChain processes the exception and returns a new array of exception values
    // Kh2 trims the array to the specified maxValues length
    errorContext.exception.values = Kh2(
      collectErrorChain(
        sourceObservable,
        config,
        globalContext,
        errorWrapper.originalException,
        additionalInfo,
        exceptionValues,
        mostRecentExceptionValue,
        0
      ),
      maxValues
    );
  }
}

module.exports = updateExceptionValuesWithProcessedException;