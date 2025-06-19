/**
 * Registers a performance instrumentation handler for 'longtask' events and records them as child spans
 * on the currently active transaction. Each long task is interpreted as a period where the main UI thread
 * was blocked, and a corresponding child span is created for performance monitoring.
 *
 * External dependencies:
 * - DP.addPerformanceInstrumentationHandler: Registers a handler for browser performance events.
 * - YU.getActiveTransaction: Retrieves the current active transaction for tracing.
 * - convertMillisecondsToSeconds: Converts a time value (ms) to a timestamp format expected by the tracing system.
 * - k8.browserPerformanceTimeOrigin: The time origin for browser performance measurements.
 *
 * @returns {void} This function does not return a value.
 */
function instrumentLongTasksForUIBlocking() {
  DP.addPerformanceInstrumentationHandler("longtask", ({ entries: longTaskEntries }) => {
    for (const longTaskEntry of longTaskEntries) {
      // Retrieve the currently active transaction for tracing
      const activeTransaction = YU.getActiveTransaction();
      if (!activeTransaction) return;

      // Calculate the start and end timestamps for the long task
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

module.exports = instrumentLongTasksForUIBlocking;