/**
 * Monitors the execution of a given task, reporting its status (in_progress, ok, error) to an external monitor.
 * Tracks the duration of the task and handles both synchronous and asynchronous (thenable) tasks.
 *
 * @param {string} monitorSlug - The identifier for the monitor to report to.
 * @param {Function} taskFunction - The function representing the task to execute. Can be synchronous or return a Promise.
 * @param {Object} monitorOptions - Additional options to pass to the monitor reporting function.
 * @returns {*} The result of the executed taskFunction (either the return value or the resolved value of a Promise).
 */
function monitorCheckInWithStatus(monitorSlug, taskFunction, monitorOptions) {
  // Start a new check-in and record the start timestamp
  const checkInId = captureCheckInWithFallback({
    monitorSlug: monitorSlug,
    status: "in_progress"
  }, monitorOptions);

  const startTimestamp = QU.timestampInSeconds();

  /**
   * Helper to report the final status of the check-in, including duration.
   * @param {string} status - The status to report ("ok" or "error").
   */
  function reportStatus(status) {
    captureCheckInWithFallback({
      monitorSlug: monitorSlug,
      status: status,
      checkInId: checkInId,
      duration: QU.timestampInSeconds() - startTimestamp
    });
  }

  let taskResult;
  try {
    // Execute the task function
    taskResult = taskFunction();
  } catch (error) {
    // On synchronous error, report and rethrow
    reportStatus("error");
    throw error;
  }

  // If the result is a thenable (Promise-like), attach handlers for async completion
  if (QU.isThenable(taskResult)) {
    Promise.resolve(taskResult).then(
      () => {
        reportStatus("ok");
      },
      () => {
        reportStatus("error");
      }
    );
  } else {
    // Synchronous completion
    reportStatus("ok");
  }

  return taskResult;
}

module.exports = monitorCheckInWithStatus;
