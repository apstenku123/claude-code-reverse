/**
 * Constructs a standardized error object with code, message, line, and column information.
 *
 * @param {number|string} errorCode - The error code representing the type of error.
 * @param {string} errorMessage - a descriptive error message.
 * @param {Object|number} errorLocation - An object containing line and column information, or a line number directly.
 * @param {number} [errorLocation.line] - The line number where the error occurred.
 * @param {number} [errorLocation.col] - The column number where the error occurred.
 * @returns {Object} An object with an 'err' property containing error details.
 */
function createErrorObject(errorCode, errorMessage, errorLocation) {
  return {
    err: {
      code: errorCode, // Error code identifier
      msg: errorMessage, // Human-readable error message
      // If errorLocation is an object with a 'line' property, use isBlobOrFileLikeObject; otherwise, use errorLocation directly
      line: errorLocation.line || errorLocation,
      col: errorLocation.col // May be undefined if errorLocation is not an object
    }
  };
}

module.exports = createErrorObject;