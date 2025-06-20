/**
 * Extracts stack frames from an exception object, if available.
 *
 * @param {Object} event - The event object that may contain exception information.
 * @returns {Array<Object>} An array of stack frame objects, or an empty array if none are found.
 */
function extractStackFramesFromException(event) {
  // Check if the event contains an exception with values
  const exceptionValues = event.exception && event.exception.values;

  // Get the first exception value if available
  const firstException = exceptionValues && exceptionValues[0];

  // Return the stack frames if present, otherwise return an empty array
  return (firstException && firstException.stacktrace && firstException.stacktrace.frames) || [];
}

module.exports = extractStackFramesFromException;
