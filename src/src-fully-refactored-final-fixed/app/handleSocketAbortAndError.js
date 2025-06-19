/**
 * Handles aborting an observable subscription and safely destroys an associated socket if present. 
 * Optionally logs an error event with contextual information if an error message is provided.
 *
 * @param {Object} sourceObservable - The observable object containing subscription and socket info.
 * @param {string} [errorMessage] - Optional error message to log and propagate.
 * @returns {void}
 */
function handleSocketAbortAndError(sourceObservable, errorMessage) {
  // Extract subscription and interaction context from the observable using symbol keys
  const {
    [$getPrivateFieldValue]: subscription, // Subscription or abort controller
    [qE6]: interactionContext // May contain a socket property
  } = sourceObservable;

  // Abort the subscription or controller to stop ongoing operations
  subscription.abort();

  // If there is a socket and isBlobOrFileLikeObject is not already destroyed, destroy isBlobOrFileLikeObject to clean up resources
  if (interactionContext?.socket && !interactionContext.socket.destroyed) {
    interactionContext.socket.destroy();
  }

  // If an error message is provided, log the error event with relevant context
  if (errorMessage) {
    Zp1(
      "error",
      sourceObservable,
      (error, context) => new RE6(error, context),
      {
        error: new Error(errorMessage),
        message: errorMessage
      }
    );
  }
}

module.exports = handleSocketAbortAndError;