/**
 * Creates a Sentry log entry object with optional exception and parameterized message support.
 *
 * @param {any} clientContext - The Sentry client context or scope.
 * @param {string|object} message - The log message, or a parameterized message object.
 * @param {string} [level="info"] - The log level (e.g., "info", "error").
 * @param {object} [eventContext] - Additional event context, possibly containing event_id and syntheticException.
 * @param {boolean} [includeStacktrace] - Whether to include stacktrace information if available.
 * @returns {object} The constructed Sentry log entry object.
 */
function createSentryLogEntry(clientContext, message, level = "info", eventContext, includeStacktrace) {
  // Initialize the log entry with event_id (if present) and log level
  const logEntry = {
    event_id: eventContext && eventContext.event_id,
    level: level
  };

  // If stacktrace should be included and a synthetic exception exists, attach stacktrace info
  if (includeStacktrace && eventContext && eventContext.syntheticException) {
    const stackFrames = processStackTraceWithHandler(clientContext, eventContext.syntheticException);
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

  // If the message is a parameterized string (e.g., a template string with params), attach as logentry
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

  // Otherwise, attach the message as a simple string
  logEntry.message = message;
  return logEntry;
}

module.exports = createSentryLogEntry;