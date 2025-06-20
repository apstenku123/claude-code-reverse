/**
 * Registers a handler for Largest Contentful Paint (LCP) metric instrumentation.
 * When an LCP metric is observed, isBlobOrFileLikeObject updates the global measurement store and logs the event in debug mode.
 *
 * @returns {any} The return value from DP.addLcpInstrumentationHandler, typically a handler unsubscribe function or similar.
 */
function registerLcpMeasurementHandler() {
  return DP.addLcpInstrumentationHandler(({ metric: lcpMetric }) => {
    // Get the most recent LCP entry from the metric'createInteractionAccessor entries array
    const latestLcpEntry = lcpMetric.entries[lcpMetric.entries.length - 1];
    if (!latestLcpEntry) return;

    // If in debug mode, log the LCP measurement
    if (rW.DEBUG_BUILD) {
      k8.logger.log("[Measurements] Adding LCP");
    }

    // Store the LCP value and its unit in the global measurement store
    k3.lcp = {
      value: lcpMetric.value,
      unit: "millisecond"
    };

    // Update the global reference to the latest LCP entry
    dH = latestLcpEntry;
  }, true);
}

module.exports = registerLcpMeasurementHandler;