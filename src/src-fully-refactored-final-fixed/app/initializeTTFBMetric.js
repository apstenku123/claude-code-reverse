/**
 * Initializes and reports the Time To First Byte (TTFB) web performance metric.
 *
 * This function sets up a metric tracker for TTFB, binds a reporting function, and
 * ensures the metric is collected and reported when the document is ready. It uses
 * navigation timing entries to calculate TTFB and only reports valid values.
 *
 * @param {Object} metricSource - The source object or observable for metric reporting.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.reportAllChanges=false] - Whether to report all metric changes or only the first.
 * @returns {void}
 */
function initializeTTFBMetric(metricSource, options = {}) {
  // Initialize the TTFB metric object
  const ttfbMetric = m59.initMetric("TTFB");

  // Bind the reporter function to the metric source and metric object
  const reportTTFB = b59.bindReporter(metricSource, ttfbMetric, options.reportAllChanges);

  // Run the following logic when the document is fully ready
  executeWhenDocumentReady(() => {
    // Get the navigation entry for performance timing
    const navigationEntry = h59.getNavigationEntry();
    if (navigationEntry) {
      // Calculate TTFB: responseStart minus activation start (if available), clamped to 0+
      ttfbMetric.value = Math.max(
        navigationEntry.responseStart - g59.getActivationStart(),
        0
      );

      // Only report if the value is within a valid range
      if (
        ttfbMetric.value < 0 ||
        ttfbMetric.value > performance.now()
      ) {
        return;
      }

      // Store the navigation entry for reporting
      ttfbMetric.entries = [navigationEntry];

      // Report the TTFB metric immediately
      reportTTFB(true);
    }
  });
}

module.exports = initializeTTFBMetric;
