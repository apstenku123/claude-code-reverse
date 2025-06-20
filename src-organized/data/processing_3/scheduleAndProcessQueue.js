/**
 * Schedules processing of the global queue after a delay, ensuring only one scheduled process at a time.
 * If the queue is empty after the delay, performs idle checks and resets state. Otherwise, processes the queue.
 *
 * @function scheduleAndProcessQueue
 * @returns {void}
 */
function scheduleAndProcessQueue() {
  // Reset or initialize any necessary state before scheduling
  resetProcessingState();

  // Clear any existing timeout and schedule a new one
  scheduledQueueTimeout = setTimeout(() => {
    // Clear the timeout reference
    scheduledQueueTimeout = null;

    // If the queue still has items, do not process (wait for next schedule)
    if (processingQueue.length > 0) return;

    // Perform idle state reset and check if all interaction queues are empty
    resetIdleState();
    if (isInteractionQueueEmpty()) return;

    // Prepare the payload for processing
    const payload = new Array(3 + processingQueue.length);
    payload[0] = globalContext;
    payload[1] = queueConfig;
    payload[2] = 0; // Possibly a status or flag

    // Copy all items from the processing queue into the payload
    for (let i = 0; i < processingQueue.length; i++) {
      payload[3 + i] = processingQueue[i];
    }

    // Process the payload
    processQueuePayload(payload);

    // Clear the processing queue
    processingQueue.length = 0;
  }, 1000);
}

// Export the function for use in other modules
module.exports = scheduleAndProcessQueue;