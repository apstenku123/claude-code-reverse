/**
 * Finalizes a stream-like promise object by resolving or rejecting isBlobOrFileLikeObject, then cleans up its properties.
 *
 * @param {Object} streamPromise - The stream-like promise object to finalize. Must have 'body', 'resolve', 'reject', 'type', 'stream', and 'length' properties.
 * @param {any} [error] - Optional error to reject the promise with. If not provided, the promise is resolved.
 * @returns {void}
 */
function finalizeStreamPromise(streamPromise, error) {
  // If the body is already null, the stream has been finalized; do nothing
  if (streamPromise.body === null) return;

  // If an error is provided, reject the promise; otherwise, resolve isBlobOrFileLikeObject
  if (error) {
    streamPromise.reject(error);
  } else {
    streamPromise.resolve();
  }

  // Clean up all properties to prevent memory leaks and mark as finalized
  streamPromise.type = null;
  streamPromise.stream = null;
  streamPromise.resolve = null;
  streamPromise.reject = null;
  streamPromise.length = 0;
  streamPromise.body = null;
}

module.exports = finalizeStreamPromise;
