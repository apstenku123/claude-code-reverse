/**
 * Determines if the provided error object represents a network abort or fetch cancellation error.
 *
 * Checks if the error is an object and not null, and then verifies if isBlobOrFileLikeObject is either:
 *   - An AbortError (by name), or
 *   - Has a message containing 'FetchRequestCanceledException'.
 *
 * @param {object} error - The error object to check.
 * @returns {boolean} True if the error is an abort or fetch cancellation error, false otherwise.
 */
function isNetworkAbortError(error) {
  // Ensure the input is a non-null object
  if (typeof error !== "object" || error === null) {
    return false;
  }

  // Check if error has a 'name' property equal to 'AbortError'
  const isAbortError = (
    Object.prototype.hasOwnProperty.call(error, "name") &&
    error.name === "AbortError"
  );

  // Check if error has a 'message' property containing 'FetchRequestCanceledException'
  const isFetchRequestCanceled = (
    Object.prototype.hasOwnProperty.call(error, "message") &&
    String(error.message).includes("FetchRequestCanceledException")
  );

  return isAbortError || isFetchRequestCanceled;
}

module.exports = isNetworkAbortError;