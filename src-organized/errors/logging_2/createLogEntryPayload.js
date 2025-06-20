/**
 * Creates a structured log entry payload for Sentry or similar logging systems.
 * Handles message formatting, exception stack traces, and parameterized strings.
 *
 * @param {Object} context - The context or source object for the log (used for stack trace extraction).
 * @param {string|Object} message - The log message, or a parameterized string object.
 * @param {string} [level="info"] - The log level (e.g., "info", "error").
 * @param {Object} [event] - Optional event object, may contain event_id and syntheticException.
 * @param {boolean} [includeStacktrace] - Whether to include stacktrace information if available.
 * @returns {Object} Structured log entry payload.
 */
function createLogEntryPayload(context, message, level = "info", event, includeStacktrace) {
  // Initialize the payload with event_id (if present) and log level
  const logPayload = {
    event_id: event && event.event_id,
    level: level
  };

  // If stacktrace inclusion is requested and a synthetic exception is present
  if (includeStacktrace && event && event.syntheticException) {
    // Extract stack frames using processStackTraceWithHandler utility
    const stackFrames = processStackTraceWithHandler(context, event.syntheticException);
    if (stackFrames.length) {
      logPayload.exception = {
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

  // If the message is a parameterized string (e.g., a Sentry template string)
  if (XU1.isParameterizedString(message)) {
    const {
      __sentry_template_string__: templateString,
      __sentry_template_values__: templateValues
    } = message;
    logPayload.logentry = {
      message: templateString,
      params: templateValues
    };
    return logPayload;
  }

  // Otherwise, treat message as a plain string
  logPayload.message = message;
  return logPayload;
}

module.exports = createLogEntryPayload;