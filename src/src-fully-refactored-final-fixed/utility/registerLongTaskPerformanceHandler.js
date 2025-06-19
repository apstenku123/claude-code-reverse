/**
 * Registers a performance instrumentation handler for 'longtask' events.
 * For each long task entry, if there is an active transaction, creates a child span
 * describing the main UI thread being blocked.
 *
 * @returns {void} This function does not return a value.
 */
function registerLongTaskPerformanceHandler() {
  DP.addPerformanceInstrumentationHandler("longtask", ({ entries: longTaskEntries }) => {
    for (const longTaskEntry of longTaskEntries) {
      // Retrieve the currently active transaction, if any
      const activeTransaction = YU.getActiveTransaction();
      if (!activeTransaction) return;

      // Calculate the start timestamp for the long task
      const startTimestamp = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin + longTaskEntry.startTime);
      // Calculate the duration of the long task
      const duration = convertMillisecondsToSeconds(longTaskEntry.duration);

      // Create a child span to represent the long task
      activeTransaction.startChild({
        description: "Main UI thread blocked",
        op: "ui.long-task",
        origin: "auto.ui.browser.metrics",
        startTimestamp: startTimestamp,
        endTimestamp: startTimestamp + duration
      });
    }
  });
}

module.exports = registerLongTaskPerformanceHandler;