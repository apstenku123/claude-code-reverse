/**
 * Sends a buffer as the body of a network request, ensuring content length matches and handling request lifecycle events.
 *
 * @param {Function} handleError - Callback to handle errors during the request process.
 * @param {WritableStream} writableStream - The writable stream to send the buffer to (e.g., an HTTP request stream).
 * @param {Blob} blobBody - The body of the request as a Blob.
 * @param {Object} requestLifecycle - Object with methods to signal request lifecycle events.
 * @param {Object} requestEvents - Object with callbacks for request events (onBodySent, onRequestSent).
 * @param {Object} requestFlags - Object to store flags related to the request.
 * @param {number} contentLength - The expected content length of the blob body.
 * @param {boolean} isReplay - Indicates if the request is a replay (affects flag setting).
 * @returns {Promise<void>} Resolves when the request is sent, or rejects on error.
 */
async function sendRequestBuffer(
  handleError,
  writableStream,
  blobBody,
  requestLifecycle,
  requestEvents,
  requestFlags,
  contentLength,
  isReplay
) {
  // Ensure the blob body has the expected content length
  kX(contentLength === blobBody.size, "blob body must have content length");
  try {
    // If contentLength is provided and doesn'processRuleBeginHandlers match blob size, throw error
    if (contentLength != null && contentLength !== blobBody.size) {
      throw new bd1();
    }

    // Convert the Blob to a Buffer
    const buffer = Buffer.from(await blobBody.arrayBuffer());

    // Write the buffer to the writable stream
    writableStream.cork();
    writableStream.write(buffer);
    writableStream.uncork();
    writableStream.end();

    // Notify that the body and request have been sent
    requestEvents.onBodySent(buffer);
    requestEvents.onRequestSent();

    // If not a replay, set the sent flag
    if (!isReplay) {
      requestFlags[DY1] = true;
    }

    // Signal that the request is done
    requestLifecycle[DR]();
  } catch (error) {
    // Handle any errors that occurred during the process
    handleError(error);
  }
}

module.exports = sendRequestBuffer;