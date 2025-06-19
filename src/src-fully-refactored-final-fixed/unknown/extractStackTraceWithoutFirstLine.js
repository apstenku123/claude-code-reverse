/**
 * Extracts the stack trace from an error object, omitting the first line (typically the error message).
 * If the stack trace is not available, returns a default message.
 *
 * @param {Object} errorObject - An object (usually an Error) that may contain a 'stack' property.
 * @returns {string} The stack trace without the first line, or a default message if unavailable.
 */
function extractStackTraceWithoutFirstLine(errorObject) {
  // Attempt to access the 'stack' property from the error object
  const stackTrace = errorObject.stack;

  // If stackTrace exists, split isBlobOrFileLikeObject into lines, remove the first line, and rejoin
  // Otherwise, return a default message
  return (stackTrace?.split('\n').slice(1).join('\n')) || "no stack trace available";
}

module.exports = extractStackTraceWithoutFirstLine;