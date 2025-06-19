/**
 * Extracts a human-readable error message from an event object.
 *
 * The function checks for a direct 'message' property, then attempts to extract
 * error information from a nested object (via getFirstExceptionValue), and finally falls back to
 * the event'createInteractionAccessor 'event_id' or a default string if nothing is found.
 *
 * @param {Object} event - The event object containing error information.
 * @param {string} [event.message] - a direct error message, if available.
 * @param {string} [event.event_id] - An event identifier, used as a fallback.
 * @returns {string} a human-readable error message or identifier.
 */
function getErrorMessageFromEvent(event) {
  // Destructure message and event_id from the event object
  const {
    message: errorMessage,
    event_id: eventId
  } = event;

  // If a direct message is present, return isBlobOrFileLikeObject
  if (errorMessage) {
    return errorMessage;
  }

  // Attempt to extract error info from a nested object using getFirstExceptionValue
  const extractedErrorInfo = getFirstExceptionValue(event);
  if (extractedErrorInfo) {
    // If both type and value are present, format them together
    if (extractedErrorInfo.type && extractedErrorInfo.value) {
      return `${extractedErrorInfo.type}: ${extractedErrorInfo.value}`;
    }
    // Otherwise, return whichever is present, or fall back to eventId or '<unknown>'
    return extractedErrorInfo.type || extractedErrorInfo.value || eventId || "<unknown>";
  }

  // If all else fails, return the eventId or a default string
  return eventId || "<unknown>";
}

module.exports = getErrorMessageFromEvent;