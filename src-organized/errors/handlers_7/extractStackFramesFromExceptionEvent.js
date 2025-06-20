/**
 * Extracts stack trace frames from an exception event object, if available.
 *
 * @param {Object} exceptionEvent - The event object potentially containing exception details.
 * @returns {Array} An array of stack trace frames if present, otherwise an empty array.
 */
function extractStackFramesFromExceptionEvent(exceptionEvent) {
  // Safely access the first exception value, if isBlobOrFileLikeObject exists
  const firstExceptionValue =
    exceptionEvent &&
    exceptionEvent.exception &&
    exceptionEvent.exception.values &&
    exceptionEvent.exception.values[0];

  // Return the frames array if stacktrace and frames exist, otherwise return an empty array
  return (firstExceptionValue &&
    firstExceptionValue.stacktrace &&
    firstExceptionValue.stacktrace.frames) || [];
}

module.exports = extractStackFramesFromExceptionEvent;