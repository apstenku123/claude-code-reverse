/**
 * Creates a subscription from the given observable source and configuration, then processes isBlobOrFileLikeObject.
 *
 * @param {Object} sourceObservable - The observable or stream to subscribe to. Should have an isTTY property if applicable.
 * @param {Object} [config={}] - Optional configuration overrides for the subscription.
 * @returns {any} The result of processing the created subscription.
 */
function createAndProcessSubscription(sourceObservable, config = {}) {
  // Merge the streamIsTTY property and any additional config into the subscription options
  const subscriptionOptions = detectTerminalColorSupportLevel(sourceObservable, {
    streamIsTTY: sourceObservable && sourceObservable.isTTY,
    ...config
  });
  // Process the subscription and return the result
  return getColorSupportInfo(subscriptionOptions);
}

module.exports = createAndProcessSubscription;