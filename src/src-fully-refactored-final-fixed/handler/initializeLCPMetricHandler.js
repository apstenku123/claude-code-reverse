/**
 * Initializes the Largest Contentful Paint (LCP) metric handler, sets up observers and event listeners
 * to track the LCP value, and reports the metric when appropriate user interactions occur or when the page is hidden.
 *
 * @param {Function} reportCallback - Callback function to be invoked with the LCP metric report.
 * @returns {Function|undefined} Returns the cleanup handler function if the observer is set up, otherwise undefined.
 */
function initializeLCPMetricHandler(reportCallback) {
  // Get the visibility watcher to determine when the page becomes hidden
  const visibilityWatcher = j59.getVisibilityWatcher();

  // Initialize the LCP metric object
  const lcpMetric = k59.initMetric("LCP");

  let reportLCPMetric;

  /**
   * Handles LCP entries and updates the metric if the entry is valid.
   * @param {PerformanceEntryList} lcpEntries - Array of LCP performance entries.
   */
  const handleLCPEntries = (lcpEntries) => {
    // Get the most recent LCP entry
    const lastEntry = lcpEntries[lcpEntries.length - 1];
    if (lastEntry) {
      // Calculate the LCP value relative to activation start
      const lcpValue = Math.max(
        lastEntry.startTime - _59.getActivationStart(),
        0
      );
      // Only update if the LCP occurred before the page was hidden
      if (lcpValue < visibilityWatcher.firstHiddenTime) {
        lcpMetric.value = lcpValue;
        lcpMetric.entries = [lastEntry];
        reportLCPMetric();
      }
    }
  };

  // Observe 'largest-contentful-paint' performance entries
  const lcpObserver = y59.observe("largest-contentful-paint", handleLCPEntries);

  if (lcpObserver) {
    // Bind the reporter to the provided callback and metric
    reportLCPMetric = S59.bindReporter(reportCallback, lcpMetric);

    /**
     * Finalizes the LCP metric, disconnects the observer, and reports the metric.
     */
    const finalizeLCPMetric = () => {
      // GIA is a global object to ensure the metric is only reported once per metric id
      if (!GIA[lcpMetric.id]) {
        handleLCPEntries(lcpObserver.takeRecords()); // Process any remaining entries
        lcpObserver.disconnect(); // Stop observing
        GIA[lcpMetric.id] = true; // Mark as reported
        reportLCPMetric(true); // Report the metric as final
      }
    };

    // Listen for user interactions that may indicate LCP should be finalized
    ["keydown", "click"].forEach((eventType) => {
      if (P59.WINDOW.document) {
        addEventListener(eventType, finalizeLCPMetric, {
          once: true,
          capture: true
        });
      }
    });

    // Also finalize LCP when the page is hidden
    x59.onHidden(finalizeLCPMetric, true);

    // Return the cleanup/finalization handler
    return finalizeLCPMetric;
  }

  // If observer could not be created, return undefined
  return;
}

module.exports = initializeLCPMetricHandler;