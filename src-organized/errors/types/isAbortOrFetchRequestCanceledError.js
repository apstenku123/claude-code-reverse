/**
 * Determines if the provided value is an error object representing either an AbortError or a FetchRequestCanceledException.
 *
 * @param {object} possibleError - The value to check, expected to be an object that may represent an error.
 * @returns {boolean} True if the object is an AbortError or its message includes 'FetchRequestCanceledException', otherwise false.
 */
function isAbortOrFetchRequestCanceledError(possibleError) {
  // Ensure the input is a non-null object
  if (typeof possibleError !== "object" || possibleError === null) {
    return false;
  }

  // Check if the error has a name property equal to 'AbortError'
  const isAbortError = "name" in possibleError && possibleError.name === "AbortError";

  // Check if the error message includes 'FetchRequestCanceledException'
  const isFetchRequestCanceled =
    "message" in possibleError &&
    String(possibleError.message).includes("FetchRequestCanceledException");

  return isAbortError || isFetchRequestCanceled;
}

module.exports = isAbortOrFetchRequestCanceledError;