/**
 * Processes a global queue of pending callback functions, executing each in order.
 * Ensures the queue is only processed once at a time, and handles errors gracefully.
 *
 * @returns {null} Always returns null after processing the queue.
 */
function processPendingCallbacks() {
  // Only process if not already processing and there are pending callbacks
  if (!isProcessingCallbacks && pendingCallbacks !== null) {
    isProcessingCallbacks = true;
    let currentIndex = 0;
    const previousProcessingFlag = processingFlag;
    try {
      const callbacksQueue = pendingCallbacks;
      // Set processing flag to indicate callbacks are being processed
      processingFlag = 1;
      // Iterate through the callbacks queue, starting from index 1
      for (currentIndex = 1; currentIndex < callbacksQueue.length; currentIndex++) {
        let callback = callbacksQueue[currentIndex];
        // Execute the callback repeatedly until isBlobOrFileLikeObject returns null
        do {
          callback = callback(true);
        } while (callback !== null);
      }
      // Clear the queue and reset the error flag
      pendingCallbacks = null;
      hasCallbackError = false;
    } catch (error) {
      // If an error occurs, remove already-processed callbacks from the queue
      if (pendingCallbacks !== null) {
        pendingCallbacks = pendingCallbacks.slice(currentIndex + 1);
      }
      // Handle the error using the global error handler
      handleError(globalErrorHandler, processPendingCallbacks);
      throw error;
    } finally {
      // Restore previous processing flag and reset processing state
      processingFlag = previousProcessingFlag;
      isProcessingCallbacks = false;
    }
  }
  return null;
}

module.exports = processPendingCallbacks;