/**
 * Tracks the status of a monitor check-in by executing a provided function and reporting its outcome.
 *
 * This function initiates a monitor check-in with status 'in_progress', executes the provided task function,
 * and then updates the check-in status to 'ok' or 'error' based on the outcome. It also measures the duration
 * of the task execution. If the task returns a thenable (Promise), the status update is performed after the
 * Promise settles.
 *
 * @param {string} monitorSlug - The unique identifier for the monitor being checked in.
 * @param {Function} taskFunction - The function representing the task to execute and monitor. May be synchronous or return a Promise.
 * @param {Object} [options] - Optional additional parameters to pass to the check-in creation.
 * @returns {*} The result of the executed taskFunction (either the return value or the resolved value of the Promise).
 */
function trackMonitorCheckIn(monitorSlug, taskFunction, options) {
  // Start a new check-in with status 'in_progress'
  const checkInId = captureCheckInWithFallback({
    monitorSlug: monitorSlug,
    status: "in_progress"
  }, options);

  // Record the start time in seconds
  const startTimestamp = QU.timestampInSeconds();

  /**
   * Updates the status of the check-in with the given status and duration.
   * @param {string} status - The new status for the check-in ('ok' or 'error').
   */
  function updateCheckInStatus(status) {
    captureCheckInWithFallback({
      monitorSlug: monitorSlug,
      status: status,
      checkInId: checkInId,
      duration: QU.timestampInSeconds() - startTimestamp
    });
  }

  let taskResult;
  try {
    // Execute the provided task function
    taskResult = taskFunction();
  } catch (error) {
    // On synchronous error, update status and rethrow
    updateCheckInStatus("error");
    throw error;
  }

  // If the result is a thenable (Promise), handle status update asynchronously
  if (QU.isThenable(taskResult)) {
    Promise.resolve(taskResult).then(
      () => {
        updateCheckInStatus("ok");
      },
      () => {
        updateCheckInStatus("error");
      }
    );
  } else {
    // Otherwise, update status immediately
    updateCheckInStatus("ok");
  }

  // Return the result of the task function
  return taskResult;
}

module.exports = trackMonitorCheckIn;