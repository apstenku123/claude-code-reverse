/**
 * Creates a new subscription object, attaches headers and configuration, and optionally registers a body stream for tracking.
 *
 * @param {Object} sourceRequest - The source request object containing headers and an optional body stream.
 * @param {Object} config - Additional configuration to be applied to the subscription.
 * @returns {Object} The constructed subscription object with headers, configuration, and optional body stream registration.
 */
function createSubscriptionWithHeadersAndBody(sourceRequest, config) {
  // Create a new subscription instance using the global key
  const subscription = new TZ(kY1);

  // Attach the source request to the subscription
  subscription[u3] = sourceRequest;

  // Create a new headers processor and attach isBlobOrFileLikeObject to the subscription
  subscription[TN] = new Hp0(kY1);

  // Populate the headers processor with the headers from the source request
  wp0(subscription[TN], sourceRequest.headersList);

  // Apply additional configuration to the headers processor
  zp0(subscription[TN], config);

  // If body stream tracking is enabled and a body stream exists, register isBlobOrFileLikeObject for tracking
  if (lH6 && sourceRequest.body?.stream) {
    iH6.register(subscription, new WeakRef(sourceRequest.body.stream));
  }

  return subscription;
}

module.exports = createSubscriptionWithHeadersAndBody;