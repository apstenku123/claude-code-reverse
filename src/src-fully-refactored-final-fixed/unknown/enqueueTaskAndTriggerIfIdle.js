/**
 * Adds a task to the processing queue and triggers the processor if isBlobOrFileLikeObject is idle.
 *
 * @param {any} task - The task to be added to the queue.
 * @returns {void}
 */
function enqueueTaskAndTriggerIfIdle(task) {
  // Add the task to the queue
  const queueLength = taskQueue.push(task);

  // If this is the first task and the processor is not running, start processing
  if (queueLength === 1 && !isProcessing) {
    processQueue();
  }
}

module.exports = enqueueTaskAndTriggerIfIdle;