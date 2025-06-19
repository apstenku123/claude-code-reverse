/**
 * Sends a blob body over a writable stream, ensuring content length and handling callbacks.
 *
 * @param {Function} handleError - Callback to handle errors during the send process.
 * @param {WritableStream} writableStream - The writable stream to send the blob data to.
 * @param {Blob} blobBody - The blob object containing the data to send.
 * @param {Object} requestController - Controller object with a method to signal request completion.
 * @param {Object} requestCallbacks - Object containing callbacks for request lifecycle events.
 * @param {Object} requestState - Object for tracking request state flags.
 * @param {number} contentLength - The expected content length of the blob body.
 * @param {boolean} isStreaming - Indicates if the request is a streaming request.
 * @throws {Error} Throws if content length does not match blob size.
 */
async function sendBlobBodyOverStream(
  handleError,
  writableStream,
  blobBody,
  requestController,
  requestCallbacks,
  requestState,
  contentLength,
  isStreaming
) {
  // Ensure the blob body has the expected content length
  kX(contentLength === blobBody.size, "blob body must have content length");
  try {
    // If content length is provided and does not match, throw an error
    if (contentLength != null && contentLength !== blobBody.size) {
      throw new bd1();
    }

    // Convert the blob to a Buffer
    const buffer = Buffer.from(await blobBody.arrayBuffer());

    // Write the buffer to the stream using cork/uncork for performance
    writableStream.cork();
    writableStream.write(buffer);
    writableStream.uncork();
    writableStream.end();

    // Notify callbacks that the body and request have been sent
    requestCallbacks.onBodySent(buffer);
    requestCallbacks.onRequestSent();

    // If not streaming, set a sent flag in the request state
    if (!isStreaming) {
      requestState[DY1] = true;
    }

    // Signal request completion
    requestController[DR]();
  } catch (error) {
    // Handle any errors that occurred during the process
    handleError(error);
  }
}

module.exports = sendBlobBodyOverStream;