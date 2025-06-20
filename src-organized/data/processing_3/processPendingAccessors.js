/**
 * Processes any pending accessor functions in the global accessor queue.
 * Ensures that accessors are only processed once at a time, and handles errors gracefully.
 *
 * @returns {null} Always returns null after processing.
 */
function processPendingAccessors() {
  // Only proceed if not already processing and there are accessors to process
  if (!isProcessingAccessors && globalAccessorQueue !== null) {
    isProcessingAccessors = true;
    let currentIndex = 0;
    const previousProcessingState = processingState;
    try {
      const accessors = globalAccessorQueue;
      // Set processing state to indicate handleMissingDoctypeError are processing accessors
      processingState = 1;
      // Iterate through each accessor in the queue
      for (currentIndex = 0; currentIndex < accessors.length; currentIndex++) {
        let accessorFunction = accessors[currentIndex];
        // Keep invoking the accessor until isBlobOrFileLikeObject returns null
        do {
          accessorFunction = accessorFunction(true);
        } while (accessorFunction !== null);
      }
      // Reset the global accessor queue and processing flag
      globalAccessorQueue = null;
      hasPendingAccessors = false;
    } catch (error) {
      // If an error occurs, remove already-processed accessors from the queue
      if (globalAccessorQueue !== null) {
        globalAccessorQueue = globalAccessorQueue.slice(currentIndex + 1);
      }
      // Handle the error using the error handler
      handleError(loggingKey, processPendingAccessors);
      throw error;
    } finally {
      // Restore previous processing state and flag
      processingState = previousProcessingState;
      isProcessingAccessors = false;
    }
  }
  return null;
}

module.exports = processPendingAccessors;