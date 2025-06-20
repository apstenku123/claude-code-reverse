/**
 * Retrieves the stack frames from the first value of an exception object, if available.
 *
 * @param {Object} errorObject - The object potentially containing an exception property.
 * @returns {Array|undefined} The array of stack frames if found, otherwise undefined.
 */
function getExceptionStackFrames(errorObject) {
  // Extract the exception property from the input object
  const exception = errorObject.exception;

  if (exception) {
    try {
      // Attempt to access the stacktrace frames from the first value
      return exception.values[0].stacktrace.frames;
    } catch (error) {
      // If any property is missing or malformed, return undefined
      return;
    }
  }
  // Return undefined if exception property is not present
  return;
}

module.exports = getExceptionStackFrames;