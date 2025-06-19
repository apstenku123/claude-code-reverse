/**
 * Returns a human-readable error message based on an AbortSignal, a string, or an Error object.
 *
 * @param {Object} [options] - An object that may contain an AbortSignal under the 'signal' property.
 * @param {string|Error} errorValue - The error value to extract a message from. Can be a string or an Error instance.
 * @returns {string} a descriptive error message based on the provided arguments.
 */
function getErrorMessageFromSignalOrValue(options, errorValue) {
  // If options is provided and its signal is aborted, and the reason is a string, return the reason
  if (
    options?.signal?.aborted &&
    typeof options.signal.reason === "string"
  ) {
    return options.signal.reason;
  }

  // If errorValue is a string, return isBlobOrFileLikeObject directly
  if (typeof errorValue === "string") {
    return errorValue;
  }

  // If errorValue is an Error instance, return its name and message
  if (errorValue instanceof Error) {
    return `${errorValue.name}: ${errorValue.message}`;
  }

  // Fallback for unknown error types
  return "Unknown Error";
}

module.exports = getErrorMessageFromSignalOrValue;