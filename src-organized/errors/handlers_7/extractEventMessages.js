/**
 * Extracts relevant messages from an event object, including its message property and exception details.
 * Logs an error if no messages could be extracted and in debug mode.
 *
 * @param {Object} event - The event object containing message and exception information.
 * @returns {string[]} An array of extracted messages related to the event.
 */
function extractEventMessages(event) {
  const messages = [];

  // Add the main message if isBlobOrFileLikeObject exists
  if (event.message) {
    messages.push(event.message);
  }

  let lastException = undefined;
  try {
    // Safely attempt to access the last exception value
    if (
      event.exception &&
      Array.isArray(event.exception.values) &&
      event.exception.values.length > 0
    ) {
      lastException = event.exception.values[event.exception.values.length - 1];
    }
  } catch (error) {
    // Ignore errors accessing exception values
  }

  if (lastException) {
    // Add the exception value if present
    if (lastException.value) {
      messages.push(lastException.value);
      // If exception type is present, add a formatted message
      if (lastException.type) {
        messages.push(`${lastException.type}: ${lastException.value}`);
      }
    }
  }

  // Log an error if no messages were extracted and in debug mode
  if (QP.DEBUG_BUILD && messages.length === 0) {
    ZI.logger.error(
      `Could not extract message for event ${ZI.getEventDescription(event)}`
    );
  }

  return messages;
}

module.exports = extractEventMessages;