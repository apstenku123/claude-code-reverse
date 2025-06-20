/**
 * Retrieves the first value from the 'values' array within the 'exception' property of the provided object.
 *
 * @param {Object} errorObject - The object potentially containing exception details.
 * @returns {any|undefined} The first value in the exception'createInteractionAccessor values array, or undefined if not present.
 */
function getFirstExceptionValue(errorObject) {
  // Check if 'exception' and 'exception.values' exist and are arrays with at least one element
  if (
    errorObject &&
    errorObject.exception &&
    Array.isArray(errorObject.exception.values) &&
    errorObject.exception.values.length > 0
  ) {
    return errorObject.exception.values[0];
  }
  // Return undefined if the structure is not as expected
  return undefined;
}

module.exports = getFirstExceptionValue;
