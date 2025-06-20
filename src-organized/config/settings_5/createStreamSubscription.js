/**
 * Creates a stream subscription with optional configuration, ensuring TTY awareness.
 *
 * @param {Object} sourceStream - The source stream or observable to subscribe to. Should have an 'isTTY' property if applicable.
 * @param {Object} [config={}] - Optional configuration overrides for the subscription.
 * @returns {any} The result of the getColorSupportInfo function, typically a subscription or processed stream.
 */
function createStreamSubscription(sourceStream, config = {}) {
  // Merge the source stream'createInteractionAccessor TTY status and any additional config into the subscription options
  const subscriptionOptions = detectTerminalColorSupportLevel(sourceStream, {
    streamIsTTY: sourceStream && sourceStream.isTTY,
    ...config
  });
  // Pass the merged options to getColorSupportInfo to create the subscription
  return getColorSupportInfo(subscriptionOptions);
}

module.exports = createStreamSubscription;