/**
 * Handles an error input and returns a standardized error response object.
 *
 * This function checks if the provided error input is already in the expected error format
 * using the `isErrorLike` function (originally `eH6`). If isBlobOrFileLikeObject is, isBlobOrFileLikeObject uses the input directly as the error.
 * Otherwise, isBlobOrFileLikeObject wraps the input in a new Error object (stringifying if necessary).
 * It also checks if the error is an abort error by inspecting the `name` property.
 * The result is passed to the `createResponse` function (originally `createHttpRequestState`) to generate the final response object.
 *
 * @param {any} errorInput - The error or value to be handled and wrapped in a response object.
 * @returns {object} Standardized error response object with type, status, error, and aborted fields.
 */
function handleErrorResponse(errorInput) {
  // Determine if the input is already an error-like object
  const isErrorLike = eH6(errorInput);

  // If already error-like, use as is; otherwise, wrap in Error
  const errorObject = isErrorLike
    ? errorInput
    : new Error(errorInput ? String(errorInput) : errorInput);

  // Check if the error is an abort error
  const isAborted = errorInput && errorInput.name === "AbortError";

  // Build and return the standardized error response
  return createHttpRequestState({
    type: "error",
    status: 0,
    error: errorObject,
    aborted: isAborted
  });
}

module.exports = handleErrorResponse;