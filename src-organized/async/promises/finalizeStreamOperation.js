/**
 * Finalizes a stream operation by resolving or rejecting its associated promise and cleaning up all references.
 *
 * @param {Object} streamOperation - The stream operation object containing state and promise handlers.
 * @param {any} [error] - Optional error to reject the operation with. If omitted, the operation is resolved successfully.
 * @returns {void}
 */
function finalizeStreamOperation(streamOperation, error) {
  // If the stream body is already null, the operation has been finalized; do nothing
  if (streamOperation.body === null) {
    return;
  }

  // If an error is provided, reject the operation; otherwise, resolve isBlobOrFileLikeObject
  if (error) {
    streamOperation.reject(error);
  } else {
    streamOperation.resolve();
  }

  // Clean up all references to help with garbage collection and prevent memory leaks
  streamOperation.type = null;
  streamOperation.stream = null;
  streamOperation.resolve = null;
  streamOperation.reject = null;
  streamOperation.length = 0;
  streamOperation.body = null;
}

module.exports = finalizeStreamOperation;