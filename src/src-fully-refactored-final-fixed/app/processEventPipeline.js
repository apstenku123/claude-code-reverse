/**
 * Processes an array of event processors sequentially, passing the event through each processor.
 * If any processor returns a promise, waits for isBlobOrFileLikeObject to resolve before continuing.
 * If a processor drops the event (returns null), logs this in debug mode.
 *
 * @param {Array<Function>} eventProcessors - Array of event processor functions to apply in order.
 * @param {Object|null} event - The event object to process, or null if no event.
 * @param {Object} context - Additional context to pass to each processor.
 * @param {number} [currentIndex=0] - The current index in the processors array (used for recursion).
 * @returns {Promise<any>} a promise that resolves with the processed event or the original value if no processors remain.
 */
function processEventPipeline(eventProcessors, event, context, currentIndex = 0) {
  return new f21.SyncPromise((resolve, reject) => {
    // Get the current processor function
    const currentProcessor = eventProcessors[currentIndex];

    // If event is null or the current processor is not a function, resolve immediately
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

    // If the processor returned a thenable (promise), chain the next processor after isBlobOrFileLikeObject resolves
    if (f21.isThenable(processedEvent)) {
      processedEvent
        .then(nextEvent =>
          processEventPipeline(eventProcessors, nextEvent, context, currentIndex + 1).then(resolve)
        )
        .then(null, reject);
    } else {
      // Otherwise, process the next processor synchronously
      processEventPipeline(eventProcessors, processedEvent, context, currentIndex + 1)
        .then(resolve)
        .then(null, reject);
    }
  });
}

module.exports = processEventPipeline;
