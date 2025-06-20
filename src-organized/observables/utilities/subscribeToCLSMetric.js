/**
 * Subscribes to the Cumulative Layout Shift (CLS) metric and reports its value.
 *
 * This function sets up a listener for CLS metric updates using the provided
 * performance observer utility. When a new CLS metric is reported, isBlobOrFileLikeObject sends
 * the metric to the reporting function and updates the global lastCLSMetric variable.
 *
 * @returns {void} This function does not return a value.
 */
function subscribeToCLSMetric() {
  // Subscribe to CLS metric changes using the performance observer utility
  return c59.onCLS(
    /**
     * Callback executed when a new CLS metric is available.
     * @param {object} clsMetric - The CLS metric object.
     */
    (clsMetric) => {
      // Report the CLS metric using the reporting function
      triggerInstrumentationHandlers("cls", { metric: clsMetric });
      // Store the latest CLS metric in a global variable for later use
      JIA = clsMetric;
    },
    {
      // Ensure all CLS changes are reported, not just the first
      reportAllChanges: true
    }
  );
}

module.exports = subscribeToCLSMetric;