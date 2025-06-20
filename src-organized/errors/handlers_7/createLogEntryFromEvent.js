/**
 * Creates a structured log entry object from the provided event data, message, and context.
 * Handles parameterized strings, stack traces from synthetic exceptions, and sets appropriate log levels.
 *
 * @param {Object} context - The context object, typically the source or environment for the event.
 * @param {string|Object} message - The log message, which may be a parameterized string object.
 * @param {string} [level="info"] - The log level (e.g., "info", "error").
 * @param {Object} [eventData] - Additional event data, may include event_id and syntheticException.
 * @param {boolean} [includeStackTrace] - Whether to include stack trace information if available.
 * @returns {Object} The structured log entry object ready for further processing or transmission.
 */
function createLogEntryFromEvent(context, message, level = "info", eventData, includeStackTrace) {
  // Initialize the log entry with event_id (if present) and log level
  const logEntry = {
    event_id: eventData && eventData.event_id,
    level: level
  };

  // If a synthetic exception is present and stack trace inclusion is requested
  if (includeStackTrace && eventData && eventData.syntheticException) {
    // Extract stack frames from the synthetic exception
    const stackFrames = processStackTraceWithHandler(context, eventData.syntheticException);
    if (stackFrames.length) {
      logEntry.exception = {
        values: [
          {
            value: message,
            stacktrace: {
              frames: stackFrames
            }
          }
        ]
      };
    }
  }

  // If the message is a parameterized string (e.g., a template string with parameters)
  if (XU1.isParameterizedString(message)) {
    const {
      __sentry_template_string__: templateString,
      __sentry_template_values__: templateValues
    } = message;
    logEntry.logentry = {
      message: templateString,
      params: templateValues
    };
    return logEntry;
  }

  // Otherwise, treat message as a plain string
  logEntry.message = message;
  return logEntry;
}

module.exports = createLogEntryFromEvent;