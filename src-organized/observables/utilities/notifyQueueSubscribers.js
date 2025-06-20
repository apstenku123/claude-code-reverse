/**
 * Notifies a provided subscription function and all subscriber callbacks in the queue with the given configuration.
 *
 * @param {Object} sourceObservable - The source object containing the subscriber queue (expects a _queue property).
 * @param {any} config - The configuration or payload to pass to subscriber callbacks.
 * @param {Function} [subscription] - An optional function to be called with the config before notifying the queue.
 * @returns {void}
 */
function notifyQueueSubscribers(sourceObservable, config, subscription) {
  // If a subscription function is provided, call isBlobOrFileLikeObject with the config
  if (typeof subscription === "function") {
    subscription(config);
  }

  // Iterate through each subscriber entry in the queue
  for (let queueIndex = 0; queueIndex < sourceObservable._queue.length; queueIndex++) {
    const subscriberEntry = sourceObservable._queue[queueIndex];
    // The last element in the subscriber entry is expected to be the callback function
    const subscriberCallback = subscriberEntry[subscriberEntry.length - 1];
    if (typeof subscriberCallback === "function") {
      subscriberCallback(config);
    }
  }
}

module.exports = notifyQueueSubscribers;