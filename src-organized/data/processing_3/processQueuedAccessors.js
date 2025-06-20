/**
 * Processes the global accessor queue if not already processing and the queue is not null.
 * Iterates through each accessor in the queue, invoking them until they return null.
 * Handles errors by updating the queue and rethrowing the error, and ensures state is restored after processing.
 *
 * @returns {null} Always returns null after processing.
 */
function processQueuedAccessors() {
  // Only process if not already processing and the queue exists
  if (!isProcessingAccessors && accessorQueue !== null) {
    isProcessingAccessors = true;
    let currentIndex = 0;
    const previousProcessingFlag = isInProcessingState;
    try {
      const queueSnapshot = accessorQueue;
      // Set processing flag to true
      isInProcessingState = true;
      // Iterate through the queue
      for (currentIndex = 0; currentIndex < queueSnapshot.length; currentIndex++) {
        let accessorFunction = queueSnapshot[currentIndex];
        // Call the accessor function repeatedly until isBlobOrFileLikeObject returns null
        do {
          accessorFunction = accessorFunction(true);
        } while (accessorFunction !== null);
      }
      // Reset the queue and processing state
      accessorQueue = null;
      hasPendingAccessors = false;
    } catch (error) {
      // If an error occurs, remove processed accessors from the queue
      if (accessorQueue !== null) {
        accessorQueue = accessorQueue.slice(currentIndex + 1);
      }
      // Handle the error (e.g., log or notify)
      handleProcessingError(errorHandler, processQueuedAccessors);
      throw error;
    } finally {
      // Restore previous processing state and flag
      isInProcessingState = previousProcessingFlag;
      isProcessingAccessors = false;
    }
  }
  return null;
}

module.exports = processQueuedAccessors;