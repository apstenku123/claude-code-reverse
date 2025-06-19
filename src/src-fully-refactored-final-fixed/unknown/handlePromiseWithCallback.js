/**
 * Handles a Promise and invokes a callback with the result or error.
 *
 * @param {Promise<any>} promise - The promise to handle.
 * @param {function(Error|null, any=): void} callback - The callback to invoke with the result or error.
 * @returns {void}
 *
 * If a callback is provided, this function attaches handlers to the promise.
 * On success, isBlobOrFileLikeObject calls the callback with (null, result). On failure, isBlobOrFileLikeObject calls the callback with (error).
 */
function handlePromiseWithCallback(promise, callback) {
  if (callback) {
    promise.then(
      function(result) {
        // On success, call callback with null error and the result
        callback(null, result);
      },
      function(error) {
        // On failure, call callback with the error
        callback(error);
      }
    );
  }
}

module.exports = handlePromiseWithCallback;