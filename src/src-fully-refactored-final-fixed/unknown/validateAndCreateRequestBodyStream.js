/**
 * Validates a given HTTP request body input and creates a ReadableStream and associated metadata.
 *
 * If the input is already a ReadableStream, ensures isBlobOrFileLikeObject is not disturbed or locked before proceeding.
 * Delegates the creation of the request body stream and metadata to createRequestBodyStream.
 *
 * @param {any} requestBody - The HTTP request body input. Can be a ReadableStream, string, Buffer, FormData, Blob, or async iterable.
 * @param {boolean} [isDuplex=false] - Indicates if the request should be treated as duplex (for streaming uploads).
 * @returns {any} The result of createRequestBodyStream, typically an object containing the ReadableStream and metadata.
 * @throws {Error} If the ReadableStream is already disturbed or locked.
 */
function validateAndCreateRequestBodyStream(requestBody, isDuplex = false) {
  // If the request body is a ReadableStream, validate its state
  if (requestBody instanceof ReadableStream) {
    // Ensure the stream has not been disturbed (already read from)
    Ld1(!Dr.isDisturbed(requestBody), "The body has already been consumed.");
    // Ensure the stream is not locked (in use elsewhere)
    Ld1(!requestBody.locked, "The stream is locked.");
  }
  // Delegate to createRequestBodyStream to handle various body types
  return createRequestBodyStream(requestBody, isDuplex);
}

module.exports = validateAndCreateRequestBodyStream;