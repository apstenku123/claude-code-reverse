/**
 * Reports the Time To First Byte (TTFB) web performance metric using the provided observable and configuration.
 * Initializes the TTFB metric, sets up a reporter, and triggers reporting when the document is ready and navigation timing is available.
 *
 * @param {Observable} observable - The observable or event source to bind the reporter to.
 * @param {Object} [config={}] - Optional configuration object. May include 'reportAllChanges' boolean flag.
 * @returns {void}
 */
function reportTTFBMetric(observable, config = {}) {
  // Initialize the TTFB metric object
  const ttfbMetric = m59.initMetric("TTFB");

  // Create a reporter function bound to the observable and metric
  const reportTTFB = b59.bindReporter(observable, ttfbMetric, config.reportAllChanges);

  // Wait until the document is ready before measuring TTFB
  executeWhenDocumentReady(() => {
    // Get the navigation timing entry
    const navigationEntry = h59.getNavigationEntry();
    if (navigationEntry) {
      // Calculate TTFB as the time from activation start to responseStart
      ttfbMetric.value = Math.max(
        navigationEntry.responseStart - g59.getActivationStart(),
        0
      );
      // Validate the TTFB value
      if (
        ttfbMetric.value < 0 ||
        ttfbMetric.value > performance.now()
      ) {
        // Invalid value, do not report
        return;
      }
      // Store the navigation entry and report the metric
      ttfbMetric.entries = [navigationEntry];
      reportTTFB(true);
    }
  });
}

module.exports = reportTTFBMetric;