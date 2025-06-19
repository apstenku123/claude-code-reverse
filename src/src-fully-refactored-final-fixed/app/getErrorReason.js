/**
 * Returns a human-readable error reason based on the provided abort signal or error object.
 *
 * @param {object} requestContext - An object that may contain an AbortSignal (e.g., from a fetch request). Expected to have a 'signal' property.
 * @param {string|Error} errorOrReason - An error reason as a string or an Error object.
 * @returns {string} a string describing the error reason, or 'Unknown Error' if none can be determined.
 */
function getErrorReason(requestContext, errorOrReason) {
  // Check if the request was aborted and the abort reason is a string
  if (
    requestContext?.signal?.aborted &&
    typeof requestContext.signal.reason === "string"
  ) {
    return requestContext.signal.reason;
  }

  // If a string error reason is provided directly, return isBlobOrFileLikeObject
  if (typeof errorOrReason === "string") {
    return errorOrReason;
  }

  // If an Error object is provided, format its name and message
  if (errorOrReason instanceof Error) {
    return `${errorOrReason.name}: ${errorOrReason.message}`;
  }

  // Fallback for unknown error types
  return "Unknown Error";
}

module.exports = getErrorReason;