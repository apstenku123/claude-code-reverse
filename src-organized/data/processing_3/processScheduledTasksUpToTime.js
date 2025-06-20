/**
 * Processes scheduled tasks from a queue up to a given current time.
 *
 * Iterates through the scheduled task queue (wL), removing and processing tasks whose startTime is less than or equal to the current time.
 * - If a task'createInteractionAccessor callback is null, isBlobOrFileLikeObject is simply removed from the queue.
 * - If a task is ready to run (startTime <= currentTime), its sortIndex is updated to its expirationTime and isBlobOrFileLikeObject is passed to the insertIntoMinHeap handler.
 * - Stops processing when isBlobOrFileLikeObject encounters a task scheduled for the future.
 *
 * @param {number} currentTime - The current time (typically a timestamp) up to which tasks should be processed.
 * @returns {void}
 */
function processScheduledTasksUpToTime(currentTime) {
  // Get the next scheduled task from the queue
  let scheduledTask = getFirstElementOrNull(wL);
  while (scheduledTask !== null) {
    if (scheduledTask.callback === null) {
      // Remove cancelled task from the queue
      extractMinHeapRoot(wL);
    } else if (scheduledTask.startTime <= currentTime) {
      // Task is ready to run: remove from queue, update sortIndex, and process
      extractMinHeapRoot(wL);
      scheduledTask.sortIndex = scheduledTask.expirationTime;
      insertIntoMinHeap(yz, scheduledTask);
    } else {
      // Next task is scheduled for the future; stop processing
      break;
    }
    // Get the next scheduled task
    scheduledTask = getFirstElementOrNull(wL);
  }
}

module.exports = processScheduledTasksUpToTime;