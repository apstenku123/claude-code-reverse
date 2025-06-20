/**
 * Adds an item to the processing queue and triggers the processing function if the queue was previously empty and not already processing.
 *
 * @param {any} item - The item to enqueue for processing.
 * @returns {void}
 */
function enqueueAndTriggerIfIdle(item) {
  // Add the item to the processing queue
  const queueLength = processingQueue.push(item);

  // If this is the first item in the queue and processing is not already underway, start processing
  if (queueLength === 1 && !isProcessing) {
    processQueue();
  }
}

// Export the function for use in other modules
module.exports = enqueueAndTriggerIfIdle;
