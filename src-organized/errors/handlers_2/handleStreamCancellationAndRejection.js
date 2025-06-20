/**
 * Handles rejection of a source promise and cancels readable streams in provided config and subscription objects.
 *
 * @param {Promise|{reject: function}} sourcePromiseOrObject - The source promise or object with a reject method to be rejected with the given error.
 * @param {Object} config - An object that may contain a body with a readable stream to cancel.
 * @param {Object} subscription - An object that may contain a body with a readable stream to cancel, accessed via a specific property.
 * @param {any} error - The error to reject/cancel with.
 * @returns {void}
 */
function handleStreamCancellationAndRejection(sourcePromiseOrObject, config, subscription, error) {
  // Reject the source promise/object if provided
  if (sourcePromiseOrObject) {
    sourcePromiseOrObject.reject(error);
  }

  // Cancel the stream in config.body if isBlobOrFileLikeObject exists and is a valid stream
  if (config.body != null && cY1(config.body?.stream)) {
    config.body.stream.cancel(error).catch(cancellationError => {
      // Ignore invalid state errors, rethrow others
      if (cancellationError.code === "ERR_INVALID_STATE") return;
      throw cancellationError;
    });
  }

  // If subscription is not provided, nothing more to do
  if (subscription == null) return;

  // Access the subscription'createInteractionAccessor property (ip0 is assumed to be a constant or symbol)
  const subscriptionEntry = subscription[ip0];

  // Cancel the stream in subscriptionEntry.body if isBlobOrFileLikeObject exists and is a valid stream
  if (subscriptionEntry.body != null && cY1(subscriptionEntry.body?.stream)) {
    subscriptionEntry.body.stream.cancel(error).catch(cancellationError => {
      // Ignore invalid state errors, rethrow others
      if (cancellationError.code === "ERR_INVALID_STATE") return;
      throw cancellationError;
    });
  }
}

module.exports = handleStreamCancellationAndRejection;