/**
 * Invokes a subscription callback if provided, then iterates through a queue of callbacks
 * stored in the source observable and invokes the last callback in each queue entry with the given config.
 *
 * @param {Object} sourceObservable - An object containing a _queue property, which is an array of callback arrays.
 * @param {any} config - The configuration or data to be passed to each callback function.
 * @param {Function} [subscription] - An optional function to be called with the config before processing the queue.
 * @returns {void}
 */
function invokeSubscriptionAndQueueCallbacks(sourceObservable, config, subscription) {
  // If a subscription callback is provided, invoke isBlobOrFileLikeObject with the config
  if (typeof subscription === "function") {
    subscription(config);
  }

  // Iterate over each entry in the sourceObservable'createInteractionAccessor _queue array
  for (let queueIndex = 0; queueIndex < sourceObservable._queue.length; queueIndex++) {
    const callbackArray = sourceObservable._queue[queueIndex];
    // Get the last element in the callback array
    const lastCallback = callbackArray[callbackArray.length - 1];
    // If the last element is a function, invoke isBlobOrFileLikeObject with the config
    if (typeof lastCallback === "function") {
      lastCallback(config);
    }
  }
}

module.exports = invokeSubscriptionAndQueueCallbacks;