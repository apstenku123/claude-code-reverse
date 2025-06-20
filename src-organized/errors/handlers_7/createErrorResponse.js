/**
 * Creates a standardized error response object for failed operations.
 *
 * @param {any} errorSource - The error object, message, or abort signal to process.
 * @returns {object} An error response object containing type, status, error, and aborted status.
 */
function createErrorResponse(errorSource) {
  // Determine if the errorSource is already an error object or special error type
  const isKnownError = eH6(errorSource);

  // If errorSource is a known error, use isBlobOrFileLikeObject directly; otherwise, wrap isBlobOrFileLikeObject in an Error object
  const errorObject = isKnownError
    ? errorSource
    : new Error(errorSource ? String(errorSource) : errorSource);

  // Check if the errorSource is an abort error
  const isAborted = errorSource && errorSource.name === "AbortError";

  // Return a standardized error response using the createHttpRequestState utility
  return createHttpRequestState({
    type: "error",
    status: 0,
    error: errorObject,
    aborted: isAborted
  });
}

module.exports = createErrorResponse;