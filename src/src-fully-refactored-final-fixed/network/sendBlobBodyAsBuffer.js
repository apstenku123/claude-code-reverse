/**
 * Sends the body of a Blob as a Buffer through a writable stream, ensuring content length matches and handling callbacks/events.
 *
 * @param {Function} handleError - Callback to handle errors that occur during the send process.
 * @param {WritableStream} writableStream - The writable stream to which the buffer will be written.
 * @param {Blob} blobBody - The Blob object whose contents are to be sent.
 * @param {Object} requestCallbacks - Object containing request lifecycle callbacks.
 * @param {Object} requestEvents - Object containing event handlers for request events.
 * @param {Object} requestFlags - Object for tracking request state flags.
 * @param {number} contentLength - The expected content length of the blob body.
 * @param {boolean} isStreaming - Indicates if the request is being streamed (affects flag setting).
 * @returns {Promise<void>} Resolves when the body has been sent and callbacks invoked.
 */
async function sendBlobBodyAsBuffer(
  handleError,
  writableStream,
  blobBody,
  requestCallbacks,
  requestEvents,
  requestFlags,
  contentLength,
  isStreaming
) {
  // Ensure the content length matches the blob'createInteractionAccessor size
  kX(contentLength === blobBody.size, "blob body must have content length");
  try {
    // If contentLength is provided and does not match blob size, throw error
    if (contentLength != null && contentLength !== blobBody.size) {
      throw new bd1();
    }

    // Convert Blob to Buffer
    const buffer = Buffer.from(await blobBody.arrayBuffer());

    // Write buffer to stream using cork/uncork for performance
    writableStream.cork();
    writableStream.write(buffer);
    writableStream.uncork();
    writableStream.end();

    // Notify listeners that the body and request have been sent
    requestEvents.onBodySent(buffer);
    requestEvents.onRequestSent();

    // If not streaming, set the DY1 flag to true in requestFlags
    if (!isStreaming) {
      requestFlags[DY1] = true;
    }

    // Invoke the request completion callback
    requestCallbacks[DR]();
  } catch (error) {
    // Handle any errors by invoking the provided error handler
    handleError(error);
  }
}

module.exports = sendBlobBodyAsBuffer;