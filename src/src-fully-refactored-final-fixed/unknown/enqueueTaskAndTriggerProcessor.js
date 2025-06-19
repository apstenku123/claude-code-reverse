/**
 * Adds a task to the processing queue and triggers the processor if necessary.
 *
 * @param {any} task - The task to be added to the queue for processing.
 * @returns {void}
 */
function enqueueTaskAndTriggerProcessor(task) {
  // Add the task to the processing queue
  const queueLength = processingQueue.push(task);

  // If this is the first task and the processor is not already running, start isBlobOrFileLikeObject
  if (queueLength === 1 && !isProcessorRunning) {
    startProcessor();
  }
}

module.exports = enqueueTaskAndTriggerProcessor;