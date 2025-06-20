/**
 * Registers a handler for Largest Contentful Paint (LCP) instrumentation events.
 * When an LCP metric is reported, this handler logs the event (in debug mode),
 * updates the global LCP measurement, and stores the latest LCP entry.
 *
 * @returns {any} The return value from DP.addLcpInstrumentationHandler, typically a handler reference or unsubscribe function.
 */
function registerLcpInstrumentationHandler() {
  return DP.addLcpInstrumentationHandler(({ metric: lcpMetric }) => {
    // Get the most recent LCP entry from the metric
    const latestLcpEntry = lcpMetric.entries[lcpMetric.entries.length - 1];
    if (!latestLcpEntry) return;

    // Log the LCP measurement if in debug mode
    if (rW.DEBUG_BUILD) {
      k8.logger.log("[Measurements] Adding LCP");
    }

    // Update the global LCP measurement with value and unit
    k3.lcp = {
      value: lcpMetric.value,
      unit: "millisecond"
    };

    // Store the latest LCP entry globally
    dH = latestLcpEntry;
  }, true);
}

module.exports = registerLcpInstrumentationHandler;