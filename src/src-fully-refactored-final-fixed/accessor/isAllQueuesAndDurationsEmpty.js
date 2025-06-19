/**
 * Checks if all relevant queues and durations are empty or uninitialized.
 *
 * This function determines whether the following conditions are met:
 *   - If the system is currently cycling (isCycling is true), and the playbackJob exists and has durations, return false.
 *   - Otherwise, return true only if all of these are empty or null:
 *       - queuedEvents
 *       - safeIntegerRangeQueue
 *       - pendingHandlers
 *       - currentNoopFunction
 *
 * @returns {boolean} True if all queues and durations are empty or uninitialized, false otherwise.
 */
function isAllQueuesAndDurationsEmpty() {
  // If the system is cycling, and there is a playback job with durations, return false
  if (isCycling) {
    if (playbackJob !== null && playbackJob.durations.length > 0) {
      return false;
    }
  }

  // Return true only if all queues are empty and the current function is the noop function
  const areQueuedEventsEmpty = queuedEvents.length === 0;
  const isSafeIntegerRangeQueueEmpty = safeIntegerRangeQueue.length === 0;
  const arePendingHandlersEmpty = pendingHandlers.length === 0;
  const isCurrentNoopFunction = currentNoopFunction === null;

  return (
    areQueuedEventsEmpty &&
    isSafeIntegerRangeQueueEmpty &&
    arePendingHandlersEmpty &&
    isCurrentNoopFunction
  );
}

module.exports = isAllQueuesAndDurationsEmpty;