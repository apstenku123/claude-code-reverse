/**
 * Creates a new subscription object, attaches headers and configuration, and optionally registers the stream for tracking.
 *
 * @param {Object} sourceObservable - The observable source object, expected to have headersList and optionally a body with a stream.
 * @param {Object} config - Additional configuration to apply to the subscription.
 * @returns {Object} The constructed subscription object with headers and configuration applied.
 */
function createSubscriptionWithConfig(sourceObservable, config) {
  // Create a new subscription object using the default key
  const subscription = new TZ(kY1);

  // Assign the observable source to the subscription'createInteractionAccessor source property
  subscription[u3] = sourceObservable;

  // Create a new headers processor and attach isBlobOrFileLikeObject to the subscription
  subscription[TN] = new Hp0(kY1);

  // Populate the headers processor with the source'createInteractionAccessor headers
  wp0(subscription[TN], sourceObservable.headersList);

  // Apply additional configuration to the headers processor
  zp0(subscription[TN], config);

  // If stream tracking is enabled and the source has a stream, register isBlobOrFileLikeObject for tracking
  if (lH6 && sourceObservable.body?.stream) {
    iH6.register(subscription, new WeakRef(sourceObservable.body.stream));
  }

  return subscription;
}

module.exports = createSubscriptionWithConfig;