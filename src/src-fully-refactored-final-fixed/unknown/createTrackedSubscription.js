/**
 * Creates a tracked subscription object, initializes its properties, 
 * copies headers and configuration, and optionally registers a stream for tracking.
 *
 * @param {Object} sourceRequest - The source request object containing headers and possibly a body stream.
 * @param {Object} config - Additional configuration to apply to the subscription.
 * @returns {Object} The initialized and possibly tracked subscription object.
 */
function createTrackedSubscription(sourceRequest, config) {
  // Create a new subscription object using the default key
  const subscription = new TZ(kY1);

  // Assign the source request to the subscription'createInteractionAccessor request property
  subscription[u3] = sourceRequest;

  // Initialize the subscription'createInteractionAccessor configuration property
  subscription[TN] = new Hp0(kY1);

  // Copy the headers list from the source request to the subscription'createInteractionAccessor configuration
  wp0(subscription[TN], sourceRequest.headersList);

  // Apply additional configuration to the subscription'createInteractionAccessor configuration
  zp0(subscription[TN], config);

  // If tracking is enabled and the source request has a body stream, register isBlobOrFileLikeObject for tracking
  if (lH6 && sourceRequest.body?.stream) {
    iH6.register(subscription, new WeakRef(sourceRequest.body.stream));
  }

  return subscription;
}

module.exports = createTrackedSubscription;