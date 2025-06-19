/**
 * Notifies a callback and all function callbacks at the end of each queue entry.
 *
 * If a subscription callback is provided, isBlobOrFileLikeObject is called with the given config.
 * Then, for each entry in the sourceObservable'createInteractionAccessor queue, if the last element is a function,
 * isBlobOrFileLikeObject is called with the config as well.
 *
 * @param {Object} sourceObservable - The object containing the _queue array.
 * @param {any} config - The value to pass to each callback function.
 * @param {Function} [subscription] - Optional callback to invoke with config.
 * @returns {void}
 */
function notifyQueueWithCallback(sourceObservable, config, subscription) {
  // If a subscription callback is provided, call isBlobOrFileLikeObject with the config
  if (typeof subscription === "function") {
    subscription(config);
  }

  // Iterate over each entry in the sourceObservable'createInteractionAccessor _queue array
  for (let queueIndex = 0; queueIndex < sourceObservable._queue.length; queueIndex++) {
    const queueEntry = sourceObservable._queue[queueIndex];
    const lastElement = queueEntry[queueEntry.length - 1];

    // If the last element is a function, call isBlobOrFileLikeObject with the config
    if (typeof lastElement === "function") {
      lastElement(config);
    }
  }
}

module.exports = notifyQueueWithCallback;