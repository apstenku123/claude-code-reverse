/**
 * Sends a blob body with appropriate headers over a writable stream, ensuring content length matches and handling callbacks.
 *
 * @async
 * @function sendBlobBodyWithHeaders
 * @param {Function} handleError - Error handler callback to be called with any thrown error.
 * @param {Object} blobBody - The blob-like object containing the body data. Must have a size property and an arrayBuffer() method.
 * @param {Object} requestSubscription - Object with a method to signal request completion (e.g., requestSubscription[IR]()).
 * @param {Object} requestCallbacks - Object containing callback methods for request lifecycle (onBodySent, onRequestSent, reset).
 * @param {WritableStream} writableStream - Stream to which the headers and body will be written. Must support cork, uncork, and write methods.
 * @param {number} contentLength - The expected content length of the blob body.
 * @param {string} headerPrefix - Prefix string for the header (e.g., empty string or indentation).
 * @param {boolean} skipReset - If true, disables the reset flag on the requestCallbacks object.
 * @returns {Promise<void>} Resolves when the body is sent and callbacks are triggered, or rejects via handleError on error.
 */
async function sendBlobBodyWithHeaders(
  handleError,
  blobBody,
  requestSubscription,
  requestCallbacks,
  writableStream,
  contentLength,
  headerPrefix,
  skipReset
) {
  // Validate that the content length matches the blob body size
  l9(contentLength === blobBody.size, "blob body must have content length");
  try {
    // If contentLength is provided and does not match blob size, throw error
    if (contentLength != null && contentLength !== blobBody.size) {
      throw new b_();
    }

    // Read the blob body into a Buffer
    const bodyBuffer = Buffer.from(await blobBody.arrayBuffer());

    // Write headers and body to the writable stream
    writableStream.cork();
    writableStream.write(
      `${headerPrefix}content-length: ${contentLength}\r\n\r\n`,
      "latin1"
    );
    writableStream.write(bodyBuffer);
    writableStream.uncork();

    // Trigger callbacks for body sent and request sent
    requestCallbacks.onBodySent(bodyBuffer);
    requestCallbacks.onRequestSent();

    // Optionally set a reset flag on the callbacks object
    if (!skipReset && requestCallbacks.reset !== false) {
      requestCallbacks[nY] = true;
    }

    // Signal request completion
    requestSubscription[IR]();
  } catch (error) {
    // Pass any error to the error handler
    handleError(error);
  }
}

module.exports = sendBlobBodyWithHeaders;