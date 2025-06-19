/**
 * Manages scheduling and updating of callback nodes and priorities for a given scheduler state.
 *
 * @param {Object} schedulerState - The current scheduler state object. Must contain callbackNode, callbackPriority, tag, etc.
 * @param {number} externalPriority - The external priority value to be considered for scheduling.
 * @returns {void}
 *
 * This function ensures that the scheduler'createInteractionAccessor callback node and priority are updated according to the latest computed priority.
 * It cancels previous callbacks if necessary, schedules new ones, and selects the appropriate scheduling strategy based on the priority.
 */
function manageSchedulerCallback(schedulerState, externalPriority) {
  const previousCallbackNode = schedulerState.callbackNode;

  // Update the scheduler state with the new external priority
  updateExpiredLanes(schedulerState, externalPriority);

  // Compute the next priority for this scheduler state
  const nextPriority = getNextLanesToProcess(
    schedulerState,
    schedulerState === j3 ? getDynamicConfigOrFallback : 0
  );

  // If there is no work to do (priority is 0), cancel any existing callback
  if (nextPriority === 0) {
    if (previousCallbackNode !== null) {
      handleDoctypeToken(previousCallbackNode);
    }
    schedulerState.callbackNode = null;
    schedulerState.callbackPriority = 0;
    return;
  }

  // Extract the lowest set bit (next priority level)
  const newCallbackPriority = nextPriority & -nextPriority;

  // If the priority has changed, update the callback
  if (schedulerState.callbackPriority !== newCallbackPriority) {
    // Cancel the previous callback if isBlobOrFileLikeObject exists
    if (previousCallbackNode !== null) {
      handleDoctypeToken(previousCallbackNode);
    }

    // If the new priority is the highest (1), use immediate scheduling
    if (newCallbackPriority === 1) {
      if (schedulerState.tag === 0) {
        f$(dW.bind(null, schedulerState));
      } else {
        addItemToGlobalArray(dW.bind(null, schedulerState));
      }

      // Use the appropriate scheduling mechanism based on getTypeOfValue
      if (getTypeOfValue) {
        h1(function () {
          if ((isValidAndTypeMatch & 6) === 0) {
            processPendingCallbacks();
          }
        });
      } else {
        handleCharacterCode(lK, processPendingCallbacks);
      }
      schedulerState.callbackNode = null;
    } else {
      // Choose the scheduling strategy based on the priority
      let scheduleStrategy;
      switch (getLeastSignificantBitValue(newCallbackPriority)) {
        case 1:
          scheduleStrategy = lK;
          break;
        case 4:
          scheduleStrategy = handleCharacterCodeInput;
          break;
        case 16:
          scheduleStrategy = handleCharacterInput;
          break;
        case 536870912:
          scheduleStrategy = oO;
          break;
        default:
          scheduleStrategy = handleCharacterInput;
      }
      // Schedule the callback using the selected strategy
      schedulerState.callbackNode = KH(
        scheduleStrategy,
        getUniqueOrFallback.bind(null, schedulerState)
      );
    }
    // Update the scheduler state'createInteractionAccessor priority
    schedulerState.callbackPriority = newCallbackPriority;
  }
}

module.exports = manageSchedulerCallback;