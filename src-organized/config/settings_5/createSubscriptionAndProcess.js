/**
 * Creates a subscription from the provided source observable and configuration, then processes isBlobOrFileLikeObject.
 *
 * @param {Object} sourceObservable - The source observable or stream to subscribe to. Should have an isTTY property if applicable.
 * @param {Object} [config={}] - Optional configuration overrides for the subscription.
 * @returns {any} The result of processing the created subscription.
 */
function createSubscriptionAndProcess(sourceObservable, config = {}) {
  // Merge default options with provided config
  const subscription = detectTerminalColorSupportLevel(sourceObservable, {
    streamIsTTY: sourceObservable && sourceObservable.isTTY, // Detect if the stream is a TTY
    ...config
  });
  // Process the subscription and return the result
  return getColorSupportInfo(subscription);
}

module.exports = createSubscriptionAndProcess;