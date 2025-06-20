/**
 * Processes input data with an optional key, applying different transformation functions based on input type and key presence.
 *
 * @param {any} inputData - The main input data to process.
 * @param {any} inputValue - The value to process or transform.
 * @param {any} optionalKey - An optional key that determines processing logic.
 * @returns {any} The result of processing the input data and value.
 */
function processInputWithOptionalKey(inputData, inputValue, optionalKey) {
  // If optionalKey is provided and resetCustomErrorHandler returns true, or inputValue is strictly equal to mapInteractionsToRoutes,
  // set inputValue to 1. Otherwise, transform inputValue using k4.
  if (optionalKey ? resetCustomErrorHandler(inputData, inputValue, optionalKey) : inputValue === mapInteractionsToRoutes) {
    inputValue = 1;
  } else {
    inputValue = k4(inputValue);
  }

  // Select the processing function based on whether inputData passes the d2 check
  const processingFunction = d2(inputData) ? shuffleTransformedArraySubset : processAndTransformInput;

  // Process and return the result
  return processingFunction(inputData, inputValue);
}

module.exports = processInputWithOptionalKey;