/**
 * Initializes and reports the Time To First Byte (TTFB) metric when the document is ready.
 *
 * @param {Object} metricObservable - Observable or context used for reporting metrics.
 * @param {Object} [options={}] - Optional configuration for reporting.
 * @param {boolean} [options.reportAllChanges=false] - Whether to report all changes or only the first.
 * @returns {void}
 *
 * This function sets up a reporter for the TTFB metric. When the document is ready,
 * isBlobOrFileLikeObject retrieves the navigation entry, calculates the TTFB value, and reports isBlobOrFileLikeObject if valid.
 */
function initializeTTFBMetricReporter(metricObservable, options = {}) {
  // Initialize the TTFB metric object
  const ttfbMetric = m59.initMetric("TTFB");

  // Create a reporter function bound to the metric observable and reporting options
  const reportTTFB = b59.bindReporter(
    metricObservable,
    ttfbMetric,
    options.reportAllChanges
  );

  // Wait until the document is ready before measuring TTFB
  executeWhenDocumentReady(() => {
    // Retrieve the navigation entry for performance timing
    const navigationEntry = h59.getNavigationEntry();
    if (navigationEntry) {
      // Calculate TTFB: responseStart minus activation start, clamped to zero
      ttfbMetric.value = Math.max(
        navigationEntry.responseStart - g59.getActivationStart(),
        0
      );

      // Validate the TTFB value is within a reasonable range
      if (
        ttfbMetric.value < 0 ||
        ttfbMetric.value > performance.now()
      ) {
        return;
      }

      // Store the navigation entry and report the TTFB metric
      ttfbMetric.entries = [navigationEntry];
      reportTTFB(true);
    }
  });
}

module.exports = initializeTTFBMetricReporter;