/**
 * Handles sending a request body over a writable stream, manages request state, and triggers callbacks.
 *
 * @param {Function} handleError - Error handler callback to be called if an exception occurs.
 * @param {WritableStream} writableStream - The writable stream to send the body to.
 * @param {Buffer|null} requestBody - The body to send, as a Buffer. Can be null.
 * @param {Object} requestCallbacks - Object containing callbacks for request lifecycle events.
 * @param {Object} requestEvents - Object containing event handlers for the request.
 * @param {Object} requestFlags - Object for tracking request state flags.
 * @param {number} expectedContentLength - The expected length of the request body.
 * @param {boolean} isReplay - Indicates if this request is a replay (affects flag setting).
 * @returns {void}
 */
function handleRequestAndSendBody(
  handleError,
  writableStream,
  requestBody,
  requestCallbacks,
  requestEvents,
  requestFlags,
  expectedContentLength,
  isReplay
) {
  try {
    // If a request body is provided and is a Buffer, validate and send isBlobOrFileLikeObject
    if (requestBody != null && P6.isBuffer(requestBody)) {
      // Ensure the content length matches the buffer length
      kX(
        expectedContentLength === requestBody.byteLength,
        "buffer body must have content length"
      );
      // Write the buffer to the stream in a corked/uncorked block
      writableStream.cork();
      writableStream.write(requestBody);
      writableStream.uncork();
      writableStream.end();
      // Notify that the body has been sent
      requestEvents.onBodySent(requestBody);
    }
    // If not a replay, set the 'sent' flag on the request
    if (!isReplay) {
      requestFlags[DY1] = true;
    }
    // Notify that the request has been sent
    requestEvents.onRequestSent();
    // Call the request sent callback
    requestCallbacks[DR]();
  } catch (error) {
    // Handle any errors that occurred during the process
    handleError(error);
  }
}

module.exports = handleRequestAndSendBody;