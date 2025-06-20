/**
 * Extracts the stack trace from an error-like object, omitting the first line (typically the error message).
 * If the stack trace is unavailable, returns a default message.
 *
 * @param {Object} errorObject - An object that may contain a 'stack' property (such as an Error instance).
 * @returns {string} The stack trace without the first line, or a default message if not available.
 */
function getStackTraceWithoutFirstLine(errorObject) {
  // Attempt to access the 'stack' property; if missing, result is undefined
  const stackTrace = errorObject.stack;

  // If stackTrace exists, split isBlobOrFileLikeObject into lines, remove the first line, and join back
  const stackWithoutFirstLine = stackTrace?.split('\n').slice(1).join('\n');

  // Return the processed stack trace, or a fallback message if not available
  return stackWithoutFirstLine || "no stack trace available";
}

module.exports = getStackTraceWithoutFirstLine;