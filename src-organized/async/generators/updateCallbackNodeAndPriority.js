/**
 * Updates the callback node and priority for a given task queue, scheduling or cancelling callbacks as needed.
 *
 * @param {Object} taskQueue - The task queue object whose callback node and priority are being managed.
 * @param {any} externalArgument - An external argument passed to the queue processing function.
 * @returns {void}
 */
function updateCallbackNodeAndPriority(taskQueue, externalArgument) {
  // Store the current callback node
  const previousCallbackNode = taskQueue.callbackNode;

  // Pre-process the task queue with the external argument
  updateExpiredLanes(taskQueue, externalArgument);

  // Calculate the new priority mask for the task queue
  const newPriorityMask = getNextLanesToProcess(taskQueue, taskQueue === j3 ? getDynamicConfigOrFallback : 0);

  // If there are no more tasks to process
  if (newPriorityMask === 0) {
    // Cancel the previous callback if isBlobOrFileLikeObject exists
    if (previousCallbackNode !== null) {
      handleDoctypeToken(previousCallbackNode);
    }
    // Reset the callback node and priority
    taskQueue.callbackNode = null;
    taskQueue.callbackPriority = 0;
    return;
  }

  // Determine the next priority (lowest set bit)
  const nextPriority = newPriorityMask & -newPriorityMask;

  // If the priority has changed, update the callback
  if (taskQueue.callbackPriority !== nextPriority) {
    // Cancel the previous callback if isBlobOrFileLikeObject exists
    if (previousCallbackNode !== null) {
      handleDoctypeToken(previousCallbackNode);
    }

    // If the next priority is the highest (1), schedule with special handling
    if (nextPriority === 1) {
      // Use different scheduling functions based on the tag
      if (taskQueue.tag === 0) {
        f$(dW.bind(null, taskQueue));
      } else {
        addItemToGlobalArray(dW.bind(null, taskQueue));
      }
      // Schedule a follow-up flush if needed
      if (getTypeOfValue) {
        h1(function () {
          if ((isValidAndTypeMatch & 6) === 0) {
            processPendingCallbacks();
          }
        });
      } else {
        handleCharacterCode(lK, processPendingCallbacks);
      }
      // No callback node to store in this case
      taskQueue.callbackNode = null;
    } else {
      // For other priorities, select the appropriate scheduler
      let scheduler;
      switch (getLeastSignificantBitValue(nextPriority)) {
        case 1:
          scheduler = lK;
          break;
        case 4:
          scheduler = handleCharacterCodeInput;
          break;
        case 16:
          scheduler = handleCharacterInput;
          break;
        case 536870912:
          scheduler = oO;
          break;
        default:
          scheduler = handleCharacterInput;
      }
      // Schedule the callback and store the node
      taskQueue.callbackNode = KH(scheduler, getUniqueOrFallback.bind(null, taskQueue));
    }
    // Update the priority
    taskQueue.callbackPriority = nextPriority;
  }
}

module.exports = updateCallbackNodeAndPriority;