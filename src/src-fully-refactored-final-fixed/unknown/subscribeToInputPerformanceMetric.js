/**
 * Subscribes to the INP (Interaction to Next Paint) performance metric and handles its reporting.
 *
 * This function sets up a listener for the INP metric using the provided performance observer utility (i59).
 * When the metric is reported, isBlobOrFileLikeObject sends the metric data to the reporting function (triggerInstrumentationHandlers) and updates the global
 * variable to store the latest metric value.
 *
 * @returns {void} This function does not return a value.
 */
function subscribeToInputPerformanceMetric() {
  // Subscribe to the INP metric using the performance observer utility
  return performanceObserver.onINP((inpMetric) => {
    // Report the INP metric using the reporting utility
    reportMetric('inp', {
      metric: inpMetric
    });
    // Store the latest INP metric in a global variable
    latestINPMetric = inpMetric;
  });
}

// External dependencies assumed to be available in the module scope:
// - performanceObserver: An object with an onINP method for subscribing to INP metrics
// - reportMetric: a function for reporting metrics (formerly triggerInstrumentationHandlers)
// - latestINPMetric: a global variable to store the latest INP metric (formerly KIA)

module.exports = subscribeToInputPerformanceMetric;