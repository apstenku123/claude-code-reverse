/**
 * Determines if the provided value is an AbortError or a FetchRequestCanceledException.
 *
 * This function checks if the input is an object (and not null), and then verifies if:
 *   - It has a 'name' property equal to 'AbortError', OR
 *   - It has a 'message' property that includes 'FetchRequestCanceledException'.
 *
 * @param {object} errorObject - The value to check, typically an error object.
 * @returns {boolean} True if the error is an AbortError or FetchRequestCanceledException, false otherwise.
 */
function isAbortOrFetchRequestCanceledError(errorObject) {
  // Ensure the input is a non-null object
  if (typeof errorObject !== "object" || errorObject === null) {
    return false;
  }

  // Check if the error is an AbortError
  const isAbortError = (
    "name" in errorObject && errorObject.name === "AbortError"
  );

  // Check if the error message indicates a FetchRequestCanceledException
  const isFetchRequestCanceled = (
    "message" in errorObject &&
    String(errorObject.message).includes("FetchRequestCanceledException")
  );

  return isAbortError || isFetchRequestCanceled;
}

module.exports = isAbortOrFetchRequestCanceledError;
