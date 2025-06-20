/**
 * Generates a structured error report object from the given error and context.
 *
 * @param {any} context - The context or source object related to the error (passed to processStackTraceWithHandler).
 * @param {Error} error - The error object to extract information from.
 * @returns {Object} An object containing error type, message, and optional stacktrace frames.
 */
function createErrorReport(context, error) {
  // Build the base error report object with type and message
  const errorReport = {
    type: error.name || error.constructor.name, // Use error name or constructor name
    value: error.message // The error message
  };

  // Extract stack trace frames using processStackTraceWithHandler utility
  const stackFrames = processStackTraceWithHandler(context, error);

  // If stack frames are available, add them to the report
  if (stackFrames.length) {
    errorReport.stacktrace = {
      frames: stackFrames
    };
  }

  return errorReport;
}

module.exports = createErrorReport;