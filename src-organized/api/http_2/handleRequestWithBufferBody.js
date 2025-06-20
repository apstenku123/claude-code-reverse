/**
 * Handles sending a request, optionally with a buffer body, and manages request lifecycle callbacks.
 *
 * @param {Function} handleError - Callback to handle errors that occur during request processing.
 * @param {Object} writableStream - The writable stream to which the buffer (if any) will be written.
 * @param {Buffer|null} requestBodyBuffer - The buffer containing the request body, or null if there is no body.
 * @param {Object} requestLifecycle - Object containing request lifecycle methods (e.g., to signal request completion).
 * @param {Object} requestCallbacks - Object containing callback methods for request events (e.g., onBodySent, onRequestSent).
 * @param {Object} requestMetadata - Metadata object for the request, which may be mutated to indicate state.
 * @param {number} expectedContentLength - The expected length of the request body buffer.
 * @param {boolean} isBodyAlreadySent - Flag indicating whether the body has already been sent.
 * @returns {void}
 */
function handleRequestWithBufferBody(
  handleError,
  writableStream,
  requestBodyBuffer,
  requestLifecycle,
  requestCallbacks,
  requestMetadata,
  expectedContentLength,
  isBodyAlreadySent
) {
  try {
    // If a buffer body is provided, validate and send isBlobOrFileLikeObject
    if (requestBodyBuffer != null && P6.isBuffer(requestBodyBuffer)) {
      // Ensure the buffer length matches the expected content length
      kX(
        expectedContentLength === requestBodyBuffer.byteLength,
        "buffer body must have content length"
      );
      // Write the buffer to the stream in a corked/uncorked block
      writableStream.cork();
      writableStream.write(requestBodyBuffer);
      writableStream.uncork();
      writableStream.end();
      // Notify that the body has been sent
      requestCallbacks.onBodySent(requestBodyBuffer);
    }
    // If the body hasn'processRuleBeginHandlers already been sent, mark isBlobOrFileLikeObject as sent in the metadata
    if (!isBodyAlreadySent) {
      requestMetadata[DY1] = true;
    }
    // Notify that the request has been sent
    requestCallbacks.onRequestSent();
    // Signal request completion
    requestLifecycle[DR]();
  } catch (error) {
    handleError(error);
  }
}

module.exports = handleRequestWithBufferBody;