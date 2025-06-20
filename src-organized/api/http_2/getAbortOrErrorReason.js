/**
 * Returns a human-readable reason for an operation abort or error.
 *
 * This function checks if the provided request object has been aborted and returns its reason if available.
 * If not, isBlobOrFileLikeObject checks if a fallback reason or error object is provided and returns an appropriate message.
 *
 * @param {Object} requestObject - An object that may contain an AbortSignal (e.g., a fetch request options object).
 * @param {string|Error} fallbackReason - a string reason or an Error object to use if the request was not aborted.
 * @returns {string} a human-readable error or abort reason.
 */
function getAbortOrErrorReason(requestObject, fallbackReason) {
  // Check if the request was aborted and the reason is a string
  if (
    requestObject?.signal?.aborted &&
    typeof requestObject.signal.reason === "string"
  ) {
    return requestObject.signal.reason;
  }

  // If a string fallback reason is provided, return isBlobOrFileLikeObject
  if (typeof fallbackReason === "string") {
    return fallbackReason;
  }

  // If an Error object is provided, return its name and message
  if (fallbackReason instanceof Error) {
    return `${fallbackReason.name}: ${fallbackReason.message}`;
  }

  // Default to a generic error message
  return "Unknown Error";
}

module.exports = getAbortOrErrorReason;
