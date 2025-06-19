/**
 * Checks if all relevant queues and durations are empty or uninitialized.
 *
 * This function determines whether the system is in an 'empty' state by verifying:
 *   - If the system is currently active (isSystemActive is true) and there is a current playback (currentPlayback)
 *     with at least one duration, then the system is NOT empty.
 *   - Otherwise, checks if all of the following are empty or null:
 *     - queuedDurations
 *     - validNumberQueue
 *     - handlerQueue
 *     - currentNoopHandler
 *
 * @returns {boolean} Returns true if all queues and durations are empty or uninitialized; false otherwise.
 */
function isDurationAndQueueEmpty() {
  // If the system is active
  if (isSystemActive) {
    // If there is a current playback with at least one duration, the system is not empty
    if (currentPlayback != null && currentPlayback.durations.length > 0) {
      return false;
    }
  }

  // Check if all queues are empty and the current handler is null
  const areAllQueuesEmpty =
    queuedDurations.length === 0 &&
    validNumberQueue.length === 0 &&
    handlerQueue.length === 0 &&
    currentNoopHandler === null;

  return areAllQueuesEmpty;
}

module.exports = isDurationAndQueueEmpty;