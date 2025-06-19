/**
 * Handles errors that occur during a subscription process by invoking the provided error handler
 * and updating the subscription'createInteractionAccessor aborted status. If an error occurs during this process,
 * isBlobOrFileLikeObject emits the error using the source observable'createInteractionAccessor emit method.
 *
 * @param {Object} sourceObservable - The observable or event emitter to emit errors on.
 * @param {Object} config - The configuration object containing error handling logic and aborted status.
 * @param {any} subscription - The subscription or error object to be passed to the error handler.
 */
function handleSubscriptionError(sourceObservable, config, subscription) {
  try {
    // Attempt to handle the error using the provided onError handler
    config.onError(subscription);
    // Update the aborted status using the external rs function
    rs(config.aborted);
  } catch (error) {
    // If an error occurs during error handling, emit isBlobOrFileLikeObject via the source observable
    sourceObservable.emit("error", error);
  }
}

module.exports = handleSubscriptionError;