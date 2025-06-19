/**
 * Processes the current event queue, serializes its state into an array, and flushes all relevant buffers.
 * This function is a core part of the processor module, responsible for packaging the current state
 * (including encoded event strings, job queues, and additional data) into a single array for downstream processing.
 * After processing, isBlobOrFileLikeObject resets all relevant buffers and state variables.
 *
 * @param {string} contextId - An identifier for the current processing context (not used directly in this function).
 * @returns {void}
 */
function processAndFlushEventQueue(contextId) {
  // Early exit if initialization or all queues/durations are empty
  processAndCleanupItems();
  if (isAllQueuesAndDurationsEmpty()) return;

  // Calculate the total number of job queue items
  const jobQueueCount = jobQueue.length + additionalHandlers.length + (currentNoopFunction === null ? 0 : 1);

  // Calculate the total size for the output array
  const outputArrayLength = 3 + globalCounter + (jobQueueCount > 0 ? 2 + jobQueueCount : 0) + trailingData.length;
  const outputArray = new Array(outputArrayLength);
  let outputIndex = 0;

  // Add header values
  outputArray[outputIndex++] = headerValue;
  outputArray[outputIndex++] = filteredProperties;
  outputArray[outputIndex++] = globalCounter;

  // Serialize all encoded event strings
  encodedEventList.forEach(function (encodedEvent, eventIndex) {
    const encodedString = encodedEvent.encodedString;
    const encodedLength = encodedString.length;
    outputArray[outputIndex++] = encodedLength;
    // Copy each character of the encoded string into the output array
    for (let charIndex = 0; charIndex < encodedLength; charIndex++) {
      outputArray[outputIndex + charIndex] = encodedString[charIndex];
    }
    outputIndex += encodedLength;
  });

  // If there are job queue items, serialize them
  if (jobQueueCount > 0) {
    outputArray[outputIndex++] = allowedJsonCharacter;
    outputArray[outputIndex++] = jobQueueCount;
    // Add job queue items in reverse order
    for (let jobIndex = jobQueue.length - 1; jobIndex >= 0; jobIndex--) {
      outputArray[outputIndex++] = jobQueue[jobIndex];
    }
    // Add additional handler items
    for (let handlerIndex = 0; handlerIndex < additionalHandlers.length; handlerIndex++) {
      outputArray[outputIndex + handlerIndex] = additionalHandlers[handlerIndex];
    }
    outputIndex += additionalHandlers.length;
    // If there is a current noop function, add isBlobOrFileLikeObject
    if (currentNoopFunction !== null) {
      outputArray[outputIndex] = currentNoopFunction;
      outputIndex++;
    }
  }

  // Add trailing data
  for (let trailingIndex = 0; trailingIndex < trailingData.length; trailingIndex++) {
    outputArray[outputIndex + trailingIndex] = trailingData[trailingIndex];
  }
  outputIndex += trailingData.length;

  // Apply the output array to the downstream processor
  applyTransformedSelector(outputArray);

  // Reset all buffers and state
  trailingData.length = 0;
  jobQueue.length = 0;
  additionalHandlers.length = 0;
  currentNoopFunction = null;
  encodedEventList.clear();
  globalCounter = 0;
}

module.exports = processAndFlushEventQueue;