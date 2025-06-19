/**
 * Manages the scheduling and updating of a callback node and its priority for a given task.
 * This function ensures that the correct callback is scheduled based on the current priority,
 * cancels any outdated callbacks, and sets up new ones as needed.
 *
 * @param {Object} task - The task object containing callback information and scheduling state.
 * @param {number} eventPriority - The current event priority mask to consider for scheduling.
 * @returns {void}
 */
function manageCallbackScheduling(task, eventPriority) {
  // Save the current callback node
  const previousCallbackNode = task.callbackNode;

  // Update the task'createInteractionAccessor internal state based on the event
  updateExpiredLanes(task, eventPriority);

  // Determine the next set of pending priorities for this task
  const pendingPriorities = getNextLanesToProcess(task, task === j3 ? getDynamicConfigOrFallback : 0);

  // If there are no pending priorities, cancel the callback and reset priority
  if (pendingPriorities === 0) {
    if (previousCallbackNode !== null) {
      handleDoctypeToken(previousCallbackNode);
    }
    task.callbackNode = null;
    task.callbackPriority = 0;
    return;
  }

  // Find the lowest priority bit set (the next priority to process)
  const nextPriority = pendingPriorities & -pendingPriorities;

  // If the priority has changed, reschedule the callback
  if (task.callbackPriority !== nextPriority) {
    // Cancel the previous callback if isBlobOrFileLikeObject exists
    if (previousCallbackNode != null) {
      handleDoctypeToken(previousCallbackNode);
    }

    // If the next priority is the highest (1), use immediate scheduling
    if (nextPriority === 1) {
      if (task.tag === 0) {
        f$(dW.bind(null, task));
      } else {
        addItemToGlobalArray(dW.bind(null, task));
      }
      // If getTypeOfValue is true, schedule processPendingCallbacks via h1, otherwise use handleCharacterCode
      if (getTypeOfValue) {
        h1(function () {
          // Only call processPendingCallbacks if isValidAndTypeMatch & 6 === 0
          if ((isValidAndTypeMatch & 6) === 0) {
            processPendingCallbacks();
          }
        });
      } else {
        handleCharacterCode(lK, processPendingCallbacks);
      }
      task.callbackNode = null;
    } else {
      // Determine the scheduler to use based on the priority
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
      // Schedule the callback using the chosen scheduler
      task.callbackNode = KH(scheduler, getUniqueOrFallback.bind(null, task));
    }
    // Update the task'createInteractionAccessor priority
    task.callbackPriority = nextPriority;
  }
}

module.exports = manageCallbackScheduling;