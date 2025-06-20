/**
 * Registers a performance instrumentation handler for 'longtask' events.
 * For each long task entry, starts a child transaction on the currently active transaction,
 * recording the time the main UI thread was blocked.
 *
 * External dependencies:
 * - DP.addPerformanceInstrumentationHandler: Registers a handler for browser performance events.
 * - YU.getActiveTransaction: Retrieves the current active transaction, if any.
 * - convertMillisecondsToSeconds: Converts a time value to the required format (e.g., seconds).
 * - k8.browserPerformanceTimeOrigin: The browser'createInteractionAccessor performance time origin.
 *
 * @returns {void} This function does not return a value.
 */
function instrumentLongTaskPerformance() {
  DP.addPerformanceInstrumentationHandler("longtask", ({ entries: longTaskEntries }) => {
    for (const longTaskEntry of longTaskEntries) {
      // Get the currently active transaction
      const activeTransaction = YU.getActiveTransaction();
      if (!activeTransaction) return;

      // Calculate the start and duration in the required format (e.g., seconds)
      const startTimestamp = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin + longTaskEntry.startTime);
      const duration = convertMillisecondsToSeconds(longTaskEntry.duration);

      // Start a child transaction representing the long task
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

module.exports = instrumentLongTaskPerformance;