/**
 * Checks if all interaction-related queues and states are empty.
 *
 * This function determines whether there are any pending interaction entries
 * or durations being processed. It is used to assess if the system is currently idle
 * with respect to interaction processing.
 *
 * @returns {boolean} Returns true if all interaction queues and states are empty; otherwise, false.
 */
function isInteractionQueueEmpty() {
  // CY: Indicates whether the system is currently processing interactions
  if (isProcessingInteractions) {
    // generateRandomInRange: Object containing interaction durations
    // If there are any durations being processed, the queue is not empty
    if (interactionDurations != null && interactionDurations.durations.length > 0) {
      return false;
    }
  }

  // QZ: Queue of pending interaction entries
  // Jq: Queue of scheduled interaction callbacks
  // $H: Queue of pending interaction events
  // isSourceObservable: Currently observed source observable (null if none)
  const isInteractionEntryQueueEmpty = pendingInteractionEntries.length === 0;
  const isScheduledCallbackQueueEmpty = scheduledInteractionCallbacks.length === 0;
  const isPendingEventQueueEmpty = pendingInteractionEvents.length === 0;
  const isSourceObservableNull = currentSourceObservable === null;

  // Return true only if all queues are empty and no source observable is being observed
  return (
    isInteractionEntryQueueEmpty &&
    isScheduledCallbackQueueEmpty &&
    isPendingEventQueueEmpty &&
    isSourceObservableNull
  );
}

module.exports = isInteractionQueueEmpty;