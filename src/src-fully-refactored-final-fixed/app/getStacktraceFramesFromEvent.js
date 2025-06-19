/**
 * Extracts stacktrace frames from an event object, if available.
 *
 * @param {Object} event - The event object that may contain exception information.
 * @returns {Array} An array of stacktrace frames, or an empty array if not present.
 */
function getStacktraceFramesFromEvent(event) {
  // Safely access the first exception value, if isBlobOrFileLikeObject exists
  const firstExceptionValue = event.exception && event.exception.values && event.exception.values[0];

  // Return the frames array if present, otherwise return an empty array
  return (firstExceptionValue && firstExceptionValue.stacktrace && firstExceptionValue.stacktrace.frames) || [];
}

module.exports = getStacktraceFramesFromEvent;