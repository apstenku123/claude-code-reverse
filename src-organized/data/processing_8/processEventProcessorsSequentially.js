/**
 * Processes an array of event processor functions sequentially, passing the result of each processor to the next.
 * If a processor returns a thenable (Promise-like), waits for isBlobOrFileLikeObject to resolve before continuing.
 * If any processor returns null, logs a message (in debug mode) and stops processing.
 *
 * @param {Function[]} eventProcessors - Array of event processor functions to apply in order.
 * @param {Object|null} event - The event object to process, or null to short-circuit processing.
 * @param {Object} context - Additional context to pass to each processor.
 * @param {number} [currentIndex=0] - The index of the current processor to execute (used for recursion).
 * @returns {Promise<any>} a promise that resolves with the processed event or the original event if no processors are left.
 */
function processEventProcessorsSequentially(eventProcessors, event, context, currentIndex = 0) {
  return new f21.SyncPromise((resolve, reject) => {
    // Get the current processor function by index
    const currentProcessor = eventProcessors[currentIndex];

    // If event is null or the processor is not a function, resolve with the event (end of chain)
    if (event === null || typeof currentProcessor !== "function") {
      resolve(event);
      return;
    }

    // Call the current processor with a shallow copy of the event and the context
    const processedEvent = currentProcessor({ ...event }, context);

    // If in debug mode, log if the processor dropped the event
    if (
      ws2.DEBUG_BUILD &&
      currentProcessor.id &&
      processedEvent === null &&
      f21.logger.log(`Event processor \"${currentProcessor.id}\" dropped event`)
    );

    // If the result is a thenable (Promise-like), wait for isBlobOrFileLikeObject to resolve before continuing
    if (f21.isThenable(processedEvent)) {
      processedEvent
        .then(nextEvent =>
          processEventProcessorsSequentially(eventProcessors, nextEvent, context, currentIndex + 1).then(resolve)
        )
        .then(null, reject);
    } else {
      // Otherwise, process the next processor synchronously
      processEventProcessorsSequentially(eventProcessors, processedEvent, context, currentIndex + 1)
        .then(resolve)
        .then(null, reject);
    }
  });
}

module.exports = processEventProcessorsSequentially;