/**
 * Determines if the provided error object represents a network request cancellation.
 * Specifically, isBlobOrFileLikeObject checks for either an AbortError (e.g., from fetch abort) or a message containing
 * 'FetchRequestCanceledException'.
 *
 * @param {object} error - The error object to inspect.
 * @returns {boolean} True if the error is an AbortError or a FetchRequestCanceledException; otherwise, false.
 */
function isFetchRequestAbortedError(error) {
  // Ensure the input is a non-null object
  if (typeof error !== "object" || error === null) {
    return false;
  }

  // Check for AbortError by name property
  const isAbortError = "name" in error && error.name === "AbortError";

  // Check for FetchRequestCanceledException in the message property
  const isFetchRequestCanceled =
    "message" in error &&
    String(error.message).includes("FetchRequestCanceledException");

  return isAbortError || isFetchRequestCanceled;
}

module.exports = isFetchRequestAbortedError;