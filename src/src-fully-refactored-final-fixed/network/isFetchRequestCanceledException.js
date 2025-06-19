/**
 * Determines if the provided error object represents a canceled fetch request.
 *
 * This function checks for two cases:
 * 1. The error object has a 'name' property equal to 'AbortError'.
 * 2. The error object has a 'message' property containing the string 'FetchRequestCanceledException'.
 *
 * @param {object} error - The error object to inspect.
 * @returns {boolean} True if the error is a fetch request cancellation, otherwise false.
 */
function isFetchRequestCanceledException(error) {
  // Ensure the input is a non-null object
  if (typeof error !== "object" || error === null) {
    return false;
  }

  // Check if the error has a 'name' property equal to 'AbortError'
  const isAbortError = "name" in error && error.name === "AbortError";

  // Check if the error message contains 'FetchRequestCanceledException'
  const isFetchRequestCanceled =
    "message" in error && String(error.message).includes("FetchRequestCanceledException");

  return isAbortError || isFetchRequestCanceled;
}

module.exports = isFetchRequestCanceledException;
