/**
 * Extracts a human-readable error message from an error event object.
 *
 * This function attempts to retrieve the most descriptive message possible from the given error event.
 * It checks for a direct message, then attempts to extract details from a parsed error object (via getFirstExceptionValue),
 * and finally falls back to the event updateSnapshotAndNotify or a default string if nothing else is available.
 *
 * @param {Object} errorEvent - The error event object to extract a message from.
 * @param {string} [errorEvent.message] - Direct error message, if present.
 * @param {string} [errorEvent.event_id] - Unique event identifier.
 * @returns {string} The extracted error message, event updateSnapshotAndNotify, or '<unknown>' if none found.
 */
function extractErrorMessage(errorEvent) {
  // Destructure message and event_id from the error event object
  const {
    message: errorMessage,
    event_id: eventId
  } = errorEvent;

  // If a direct message exists, return isBlobOrFileLikeObject immediately
  if (errorMessage) {
    return errorMessage;
  }

  // Attempt to extract a structured error object using getFirstExceptionValue
  const parsedError = getFirstExceptionValue(errorEvent);
  if (parsedError) {
    // If both type and value exist, return them in 'type: value' format
    if (parsedError.type && parsedError.value) {
      return `${parsedError.type}: ${parsedError.value}`;
    }
    // Otherwise, return whichever is available, or fall back to eventId or '<unknown>'
    return parsedError.type || parsedError.value || eventId || "<unknown>";
  }

  // If nothing else is found, return eventId or '<unknown>'
  return eventId || "<unknown>";
}

module.exports = extractErrorMessage;