/**
 * Determines if the provided value is an AbortError or a FetchRequestCanceledException.
 *
 * This function checks if the input is a non-null object and then:
 *   - Returns true if the object has a 'name' property equal to 'AbortError'.
 *   - Returns true if the object has a 'message' property containing 'FetchRequestCanceledException'.
 * Otherwise, returns false.
 *
 * @param {object} possibleError - The value to check, typically an error object.
 * @returns {boolean} True if the value is an AbortError or FetchRequestCanceledException, false otherwise.
 */
function isAbortOrFetchCanceledError(possibleError) {
  // Ensure the input is a non-null object
  if (typeof possibleError !== "object" || possibleError === null) {
    return false;
  }

  // Check for AbortError by name property
  const isAbortError = "name" in possibleError && possibleError.name === "AbortError";

  // Check for FetchRequestCanceledException in the message property
  const isFetchCanceled =
    "message" in possibleError &&
    String(possibleError.message).includes("FetchRequestCanceledException");

  return isAbortError || isFetchCanceled;
}

module.exports = isAbortOrFetchCanceledError;