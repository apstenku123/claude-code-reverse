/**
 * Formats an error object with its type, message, and optional stack trace frames.
 *
 * @param {any} errorSource - The source object or context related to the error (used by processStackTraceWithHandler).
 * @param {Error} errorObject - The error object to extract information from.
 * @returns {Object} An object containing the error type, message, and optional stack trace frames.
 */
function formatErrorWithStacktrace(errorSource, errorObject) {
  // Extract the error type: use the 'name' property if available, otherwise use the constructor'createInteractionAccessor name
  const formattedError = {
    type: errorObject.name || errorObject.constructor.name,
    value: errorObject.message
  };

  // processStackTraceWithHandler presumably extracts stack trace frames from the error
  const stackFrames = processStackTraceWithHandler(errorSource, errorObject);

  // If stack frames are present, include them in the result
  if (stackFrames.length) {
    formattedError.stacktrace = {
      frames: stackFrames
    };
  }

  return formattedError;
}

module.exports = formatErrorWithStacktrace;