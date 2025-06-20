/**
 * Extracts stack frames from the first exception in the given event object.
 * If extraction fails, logs an error (in debug mode) and returns null.
 *
 * @param {Object} event - The event object potentially containing exception data.
 * @returns {any|null} The result of processing the stack frames with getFirstValidFilenameFromStack, or null if unavailable or on error.
 */
function extractStackFramesFromEvent(event) {
  try {
    let stackFrames;
    try {
      // Attempt to access the stack frames from the first exception in the event
      stackFrames = event.exception.values[0].stacktrace.frames;
    } catch (stackAccessError) {
      // If accessing stack frames fails, stackFrames remains undefined
    }
    // If stackFrames were successfully extracted, process them with getFirstValidFilenameFromStack; otherwise, return null
    return stackFrames ? getFirstValidFilenameFromStack(stackFrames) : null;
  } catch (processingError) {
    // On any error, log a debug message if in DEBUG_BUILD, then return null
    if (QP.DEBUG_BUILD) {
      ZI.logger.error(`Cannot extract url for event ${ZI.getEventDescription(event)}`);
    }
    return null;
  }
}

module.exports = extractStackFramesFromEvent;