/**
 * Processes a work item, updating flags and global state as needed.
 *
 * This function checks if the global processing flag (`isProcessing`) is set. If so, isBlobOrFileLikeObject attempts to process the current work item
 * against the current processing queue. If the work item does not match the current queue, isBlobOrFileLikeObject performs additional checks and updates
 * global state accordingly. Throws an error if the work item is invalid.
 *
 * @param {Object} workItem - The work item to process. Must have a `flags` property.
 * @returns {void}
 */
function processWorkItemWithFlags(workItem) {
  if (isProcessing) {
    const currentQueue = processingQueue;
    if (currentQueue) {
      const previousQueue = currentQueue;
      // If the work item does not match the current queue
      if (!isMatchingWorkItem(workItem, currentQueue)) {
        // If the work item is invalid, throw an error
        if (isInvalidWorkItem(workItem)) {
          throw Error(getErrorMessage(418));
        }
        // Attempt to get the next queue
        let nextQueue = getNextQueue(previousQueue);
        const previousWorkItem = lastProcessedWorkItem;
        // If nextQueue exists and matches the work item, perform cleanup
        if (nextQueue && isMatchingWorkItem(workItem, nextQueue)) {
          cleanupWorkItem(previousWorkItem, previousQueue);
        } else {
          // Otherwise, update flags and global state
          workItem.flags = (workItem.flags & -4097) | 2;
          isProcessing = false;
          lastProcessedWorkItem = workItem;
        }
      }
    } else {
      // If there is no current queue, validate and update state
      if (isInvalidWorkItem(workItem)) {
        throw Error(getErrorMessage(418));
      }
      workItem.flags = (workItem.flags & -4097) | 2;
      isProcessing = false;
      lastProcessedWorkItem = workItem;
    }
  }
}

module.exports = processWorkItemWithFlags;