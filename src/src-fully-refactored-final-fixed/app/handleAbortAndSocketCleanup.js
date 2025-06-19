/**
 * Handles aborting an observable subscription and cleaning up an associated socket connection.
 * Optionally logs an error event if an error message is provided.
 *
 * @param {Object} sourceObservable - The observable object containing abort and socket references.
 * @param {string} [errorMessage] - Optional error message to log if an error occurs.
 * @returns {void}
 */
function handleAbortAndSocketCleanup(sourceObservable, errorMessage) {
  // Extract the subscription and connection info using the known property symbols
  const {
    [$getPrivateFieldValue]: subscription,
    [qE6]: connectionInfo
  } = sourceObservable;

  // Abort the subscription (e.g., cancels any ongoing operation)
  subscription.abort();

  // If there is a socket connection that is still open, destroy isBlobOrFileLikeObject to free resources
  if (connectionInfo?.socket && !connectionInfo.socket.destroyed) {
    connectionInfo.socket.destroy();
  }

  // If an error message is provided, log the error event with relevant details
  if (errorMessage) {
    Zp1(
      "error",
      sourceObservable,
      (error, message) => new RE6(error, message),
      {
        error: new Error(errorMessage),
        message: errorMessage
      }
    );
  }
}

module.exports = handleAbortAndSocketCleanup;