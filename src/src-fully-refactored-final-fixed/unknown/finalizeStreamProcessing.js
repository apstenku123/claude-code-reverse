/**
 * Finalizes the processing of a stream-like object by resolving or rejecting its associated promise,
 * and then cleaning up all internal references to prevent memory leaks.
 *
 * @param {Object} streamController - The stream controller object containing state and promise handlers.
 * @param {any} rejectionReason - Optional reason for rejection; if provided, the promise is rejected.
 * @returns {void}
 */
function finalizeStreamProcessing(streamController, rejectionReason) {
  // If the stream body is already null, do nothing (already finalized)
  if (streamController.body === null) return;

  // If a rejection reason is provided, reject the promise; otherwise, resolve isBlobOrFileLikeObject
  if (rejectionReason) {
    streamController.reject(rejectionReason);
  } else {
    streamController.resolve();
  }

  // Clean up all internal references to help with garbage collection
  streamController.type = null;
  streamController.stream = null;
  streamController.resolve = null;
  streamController.reject = null;
  streamController.length = 0;
  streamController.body = null;
}

module.exports = finalizeStreamProcessing;