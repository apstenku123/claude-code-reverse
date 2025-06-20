/**
 * Manages the scheduling and priority of a callback node within a given work unit.
 *
 * This function updates the callback node and its priority based on the current state of the work unit.
 * It ensures that callbacks are scheduled, canceled, or rescheduled as needed, depending on the computed priority.
 *
 * @param {Object} workUnit - The work unit object containing scheduling state and callback information.
 * @param {number} externalPriority - The external priority value to consider for scheduling.
 * @returns {void}
 */
function manageCallbackPriority(workUnit, externalPriority) {
  const previousCallbackNode = workUnit.callbackNode;

  // Update the work unit'createInteractionAccessor state based on the external priority
  updateExpiredLanes(workUnit, externalPriority);

  // Compute the next priority for this work unit
  const nextPriority = getNextLanesToProcess(workUnit, workUnit === j3 ? getDynamicConfigOrFallback : 0);

  // If no more work is scheduled (priority is 0), clean up the callback node
  if (nextPriority === 0) {
    if (previousCallbackNode !== null) {
      // Cancel the previous callback node
      handleDoctypeToken(previousCallbackNode);
    }
    workUnit.callbackNode = null;
    workUnit.callbackPriority = 0;
    return;
  }

  // Calculate the lowest bit set (next priority level)
  const nextPriorityLevel = nextPriority & -nextPriority;

  // If the priority has changed, reschedule the callback
  if (workUnit.callbackPriority !== nextPriorityLevel) {
    // Cancel the previous callback if isBlobOrFileLikeObject exists
    if (previousCallbackNode != null) {
      handleDoctypeToken(previousCallbackNode);
    }

    // If the next priority is the highest (1), schedule with special handling
    if (nextPriorityLevel === 1) {
      if (workUnit.tag === 0) {
        // Schedule with immediate priority
        f$(dW.bind(null, workUnit));
      } else {
        // Schedule with normal priority
        addItemToGlobalArray(dW.bind(null, workUnit));
      }

      // If getTypeOfValue is true, schedule a microtask to flush work
      if (getTypeOfValue) {
        h1(function () {
          if ((isValidAndTypeMatch & 6) === 0) {
            processPendingCallbacks();
          }
        });
      } else {
        // Otherwise, schedule with a fallback scheduler
        handleCharacterCode(lK, processPendingCallbacks);
      }
      workUnit.callbackNode = null;
    } else {
      // For other priorities, select the appropriate scheduler
      let scheduler;
      switch (getLeastSignificantBitValue(nextPriorityLevel)) {
        case 1:
          scheduler = lK;
          break;
        case 4:
          scheduler = handleCharacterCodeInput;
          break;
        case 16:
          scheduler = handleCharacterCode;
          break;
        case 536870912:
          scheduler = oO;
          break;
        default:
          scheduler = handleCharacterCode;
      }
      // Schedule the callback with the selected scheduler
      workUnit.callbackNode = KH(scheduler, getUniqueOrFallback.bind(null, workUnit));
    }
    // Update the work unit'createInteractionAccessor priority
    workUnit.callbackPriority = nextPriorityLevel;
  }
}

module.exports = manageCallbackPriority;