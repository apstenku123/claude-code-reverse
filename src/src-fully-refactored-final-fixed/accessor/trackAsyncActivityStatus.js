/**
 * Tracks the status of an asynchronous activity, reporting its progress and outcome.
 *
 * This function initiates a monitoring activity, executes the provided activity function,
 * and updates the monitor'createInteractionAccessor status based on the result (success or error). If the activity
 * returns a thenable (Promise-like), isBlobOrFileLikeObject waits for resolution or rejection before updating
 * the status. Otherwise, isBlobOrFileLikeObject updates the status immediately.
 *
 * @param {string} monitorSlug - a unique identifier for the monitor/activity being tracked.
 * @param {Function} activityFunction - The function representing the activity to execute. May return a Promise.
 * @param {object} monitorOptions - Additional options to pass to the monitor initialization.
 * @returns {*} The return value of the activityFunction (may be a Promise).
 */
function trackAsyncActivityStatus(monitorSlug, activityFunction, monitorOptions) {
  // Start monitoring the activity with status 'in_progress'
  const checkInId = captureCheckInWithFallback({
    monitorSlug: monitorSlug,
    status: "in_progress"
  }, monitorOptions);

  // Record the start time in seconds
  const startTimestamp = QU.timestampInSeconds();

  /**
   * Updates the monitor status with the given status and duration.
   *
   * @param {string} status - The new status to report (e.g., 'ok', 'error').
   */
  function updateMonitorStatus(status) {
    captureCheckInWithFallback({
      monitorSlug: monitorSlug,
      status: status,
      checkInId: checkInId,
      duration: QU.timestampInSeconds() - startTimestamp
    });
  }

  let activityResult;
  try {
    // Execute the activity function and capture its result
    activityResult = activityFunction();
  } catch (error) {
    // On synchronous error, update monitor status and rethrow
    updateMonitorStatus("error");
    throw error;
  }

  // If the result is a thenable (Promise-like), attach handlers
  if (QU.isThenable(activityResult)) {
    Promise.resolve(activityResult).then(
      () => {
        updateMonitorStatus("ok");
      },
      () => {
        updateMonitorStatus("error");
      }
    );
  } else {
    // Otherwise, update status immediately as 'ok'
    updateMonitorStatus("ok");
  }

  // Return the result of the activity function
  return activityResult;
}

module.exports = trackAsyncActivityStatus;