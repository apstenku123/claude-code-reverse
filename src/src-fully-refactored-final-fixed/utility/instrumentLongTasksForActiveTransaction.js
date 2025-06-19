/**
 * Registers a performance instrumentation handler for 'longtask' events and records them as child spans
 * on the currently active transaction, if any. Each long task is tracked as a span with descriptive metadata.
 *
 * External dependencies:
 * - DP.addPerformanceInstrumentationHandler: Registers a handler for browser performance events.
 * - YU.getActiveTransaction: Retrieves the currently active transaction, if any.
 * - convertMillisecondsToSeconds: Converts a time value to a timestamp (implementation-specific).
 *
 * @returns {void} This function does not return a value.
 */
function instrumentLongTasksForActiveTransaction() {
  DP.addPerformanceInstrumentationHandler("longtask", ({ entries: longTaskEntries }) => {
    for (const longTaskEntry of longTaskEntries) {
      // Retrieve the currently active transaction (if any)
      const activeTransaction = YU.getActiveTransaction();
      if (!activeTransaction) return;

      // Calculate the start and duration timestamps for the long task
      const startTimestamp = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin + longTaskEntry.startTime);
      const duration = convertMillisecondsToSeconds(longTaskEntry.duration);

      // Record the long task as a child span on the active transaction
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

module.exports = instrumentLongTasksForActiveTransaction;