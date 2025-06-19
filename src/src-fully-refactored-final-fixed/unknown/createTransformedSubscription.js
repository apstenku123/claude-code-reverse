/**
 * Creates a transformed subscription from a source observable, with optional configuration.
 *
 * This function wraps the source observable with additional configuration, including whether the stream is a TTY (teletypewriter),
 * and passes the resulting subscription to a transformer function for further processing.
 *
 * @param {Object} sourceObservable - The source observable or stream to subscribe to. Should have an 'isTTY' property if applicable.
 * @param {Object} [config={}] - Optional configuration overrides for the subscription.
 * @returns {any} The result of transforming the subscription with the transformer function.
 */
function createTransformedSubscription(sourceObservable, config = {}) {
  // Merge the default streamIsTTY property with any provided configuration
  const subscription = detectTerminalColorSupportLevel(sourceObservable, {
    streamIsTTY: sourceObservable && sourceObservable.isTTY,
    ...config
  });
  // Transform the subscription using the external transformer function
  return getColorSupportInfo(subscription);
}

module.exports = createTransformedSubscription;