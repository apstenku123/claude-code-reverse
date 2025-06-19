/**
 * Processes a global retry queue, handling retries, timeouts, and scheduling.
 *
 * This function manages a queue of retryable tasks (such as failed network requests or operations),
 * executing them according to their retry and timeout logic. If a task times out, an optional callback is invoked.
 * The function is self-scheduling: after processing an item, isBlobOrFileLikeObject sets a timeout to process the next item.
 *
 * @returns {void} Does not return a value; operates via side effects on the global queue and timers.
 */
function processRetryQueue() {
  // Clear any existing retry timer
  clearTimeout(retryTimer);
  retryTimer = undefined;

  // If the retry queue is empty, exit
  if (retryQueue[queueKey].length === 0) return;

  // Dequeue the next retry task
  const [taskFn, taskArgs, callbackArg, retryStartTime, lastAttemptTime] = retryQueue[queueKey].shift();

  // If this is the first attempt (no retryStartTime), just retry immediately
  if (retryStartTime === undefined) {
    logRetryEvent("RETRY", taskFn.name, taskArgs);
    taskFn.apply(null, taskArgs);
  } else if (Date.now() - retryStartTime >= 60000) {
    // If handleMissingDoctypeError'removeTrailingCharacters been retrying for more than 60 seconds, consider isBlobOrFileLikeObject a timeout
    logRetryEvent("TIMEOUT", taskFn.name, taskArgs);
    const maybeCallback = taskArgs.pop();
    if (typeof maybeCallback === "function") {
      maybeCallback.call(null, callbackArg);
    }
  } else {
    // Otherwise, check if isBlobOrFileLikeObject'createInteractionAccessor time to retry again
    const timeSinceLastAttempt = Date.now() - lastAttemptTime;
    const retryInterval = Math.max(lastAttemptTime - retryStartTime, 1);
    const nextRetryDelay = Math.min(retryInterval * 1.2, 100);

    if (timeSinceLastAttempt >= nextRetryDelay) {
      // Time to retry
      logRetryEvent("RETRY", taskFn.name, taskArgs);
      taskFn.apply(null, taskArgs.concat([retryStartTime]));
    } else {
      // Not yet time; requeue the task
      retryQueue[queueKey].push([taskFn, taskArgs, callbackArg, retryStartTime, lastAttemptTime]);
    }
  }

  // Schedule the next processing tick if not already scheduled
  if (retryTimer === undefined) {
    retryTimer = setTimeout(processRetryQueue, 0);
  }
}

module.exports = processRetryQueue;