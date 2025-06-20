/**
 * Processes and manages a queue of pending asynchronous tasks, handling retries and timeouts.
 * Each task entry contains a function to execute, its arguments, retry metadata, and a timestamp.
 * The function ensures tasks are retried if needed, handles timeouts, and schedules itself to process the next task.
 *
 * @returns {void} No return value.
 */
function processPendingTasks() {
  // Clear any existing timeout to prevent duplicate scheduling
  clearTimeout(pendingTaskTimeoutId);
  pendingTaskTimeoutId = undefined;

  // If there are no tasks in the queue, exit early
  if (taskQueue[taskQueueKey].length === 0) return;

  // Dequeue the next task
  const [taskFunction, taskArgs, retryData, retryStartTimestamp, lastAttemptTimestamp] = taskQueue[taskQueueKey].shift();

  // If this is the first attempt (no retryStartTimestamp), just retry immediately
  if (retryStartTimestamp === undefined) {
    logTaskEvent("RETRY", taskFunction.name, taskArgs);
    taskFunction.apply(null, taskArgs);
  } else if (Date.now() - retryStartTimestamp >= 60000) {
    // If the task has been retrying for more than 60 seconds, consider isBlobOrFileLikeObject timed out
    logTaskEvent("TIMEOUT", taskFunction.name, taskArgs);
    const possibleCallback = taskArgs.pop();
    if (typeof possibleCallback === "function") {
      // Call the callback with the retry data if provided
      possibleCallback.call(null, retryData);
    }
  } else {
    // Calculate how long since the last attempt
    const timeSinceLastAttempt = Date.now() - lastAttemptTimestamp;
    // Calculate the minimum delay before next retry (scaled by 1.2, capped at 100ms)
    const minDelay = Math.max(lastAttemptTimestamp - retryStartTimestamp, 1);
    const nextRetryDelay = Math.min(minDelay * 1.2, 100);

    if (timeSinceLastAttempt >= nextRetryDelay) {
      // Enough time has passed, retry the task
      logTaskEvent("RETRY", taskFunction.name, taskArgs);
      // Pass the retryStartTimestamp as an additional argument
      taskFunction.apply(null, taskArgs.concat([retryStartTimestamp]));
    } else {
      // Not enough time has passed, requeue the task for later
      taskQueue[taskQueueKey].push([
        taskFunction,
        taskArgs,
        retryData,
        retryStartTimestamp,
        lastAttemptTimestamp
      ]);
    }
  }

  // Schedule the next processing cycle if not already scheduled
  if (pendingTaskTimeoutId === undefined) {
    pendingTaskTimeoutId = setTimeout(processPendingTasks, 0);
  }
}

module.exports = processPendingTasks;