/**
 * Registers a handler to capture and record First Input Delay (FID) metrics.
 * This function sets up an instrumentation handler that listens for FID metric events,
 * extracts relevant timing information, and stores the results in the global `k3` object.
 *
 * @returns {any} The return value of DP.addFidInstrumentationHandler (typically an unsubscribe function or handler updateSnapshotAndNotify)
 */
function registerFirstInputDelayHandler() {
  return DP.addFidInstrumentationHandler(({ metric }) => {
    // Get the last entry from the metric'createInteractionAccessor entries array (the most recent FID event)
    const lastFidEntry = metric.entries[metric.entries.length - 1];
    if (!lastFidEntry) return;

    // Convert browser performance time origin and entry start time to seconds (or appropriate units)
    const timeOrigin = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin);
    const fidStartTime = convertMillisecondsToSeconds(lastFidEntry.startTime);

    // If in debug mode, log the FID measurement
    if (rW.DEBUG_BUILD && k8.logger) {
      k8.logger.log("[Measurements] Adding FID");
    }

    // Store the FID value in milliseconds
    k3.fid = {
      value: metric.value,
      unit: "millisecond"
    };

    // Store the FID mark (absolute timestamp) in seconds
    k3["mark.fid"] = {
      value: timeOrigin + fidStartTime,
      unit: "second"
    };
  });
}

module.exports = registerFirstInputDelayHandler;