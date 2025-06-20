/**
 * Creates a subscription from the provided observable source, merging configuration options and TTY status.
 *
 * @param {Object} sourceObservable - The observable or stream to subscribe to. Should have an isTTY property if applicable.
 * @param {Object} [config={}] - Optional configuration overrides for the subscription.
 * @returns {any} The result of the getColorSupportInfo function, typically a subscription or processed stream.
 */
function createSubscriptionWithTTY(sourceObservable, config = {}) {
  // Merge the provided config with the stream'createInteractionAccessor TTY status
  const subscriptionOptions = detectTerminalColorSupportLevel(sourceObservable, {
    streamIsTTY: sourceObservable && sourceObservable.isTTY,
    ...config
  });
  // Create and return the subscription using getColorSupportInfo
  return getColorSupportInfo(subscriptionOptions);
}

module.exports = createSubscriptionWithTTY;