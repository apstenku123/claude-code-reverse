/**
 * Sets up a handler to observe and report the Largest Contentful Paint (LCP) metric.
 * This function initializes the LCP metric, observes the 'largest-contentful-paint' entries,
 * and reports the value when a user interaction (keydown/click) or page hide occurs.
 *
 * @param {Function} reportCallback - Callback function to report the LCP metric when available.
 * @returns {Function|undefined} Cleanup function to disconnect the observer and finalize the metric, or undefined if observer not supported.
 */
function setupLcpMetricHandler(reportCallback) {
  // Get the visibility watcher to determine when the page becomes hidden
  const visibilityWatcher = j59.getVisibilityWatcher();
  // Initialize the LCP metric object
  const lcpMetric = k59.initMetric("LCP");
  let finalizeReport;

  /**
   * Processes the list of LCP entries and updates the metric if appropriate.
   * @param {Array} lcpEntries - Array of LCP PerformanceEntry objects.
   */
  const processLcpEntries = (lcpEntries) => {
    // Get the most recent LCP entry
    const latestEntry = lcpEntries[lcpEntries.length - 1];
    if (latestEntry) {
      // Calculate the LCP time relative to activation start
      const lcpTime = Math.max(latestEntry.startTime - _59.getActivationStart(), 0);
      // Only update the metric if the LCP occurred before the page was hidden
      if (lcpTime < visibilityWatcher.firstHiddenTime) {
        lcpMetric.value = lcpTime;
        lcpMetric.entries = [latestEntry];
        // Report the metric
        finalizeReport();
      }
    }
  };

  // Observe 'largest-contentful-paint' entries
  const lcpObserver = y59.observe("largest-contentful-paint", processLcpEntries);
  if (lcpObserver) {
    // Bind the reporter to the callback and metric
    finalizeReport = S59.bindReporter(reportCallback, lcpMetric);

    /**
     * Handles user interaction or page hide to finalize the LCP metric.
     */
    const finalizeLcpOnInteraction = () => {
      // Ensure the metric is only finalized once per metric id
      if (!GIA[lcpMetric.id]) {
        // Process any remaining LCP entries
        processLcpEntries(lcpObserver.takeRecords());
        // Disconnect the observer
        lcpObserver.disconnect();
        // Mark as finalized
        GIA[lcpMetric.id] = true;
        // Report the metric as final
        finalizeReport(true);
      }
    };

    // Listen for user interactions that should finalize the LCP metric
    ["keydown", "click"].forEach(eventType => {
      if (P59.WINDOW.document) {
        addEventListener(eventType, finalizeLcpOnInteraction, {
          once: true,
          capture: true
        });
      }
    });

    // Also finalize when the page is hidden
    x59.onHidden(finalizeLcpOnInteraction, true);

    // Return the cleanup/finalization function
    return finalizeLcpOnInteraction;
  }
  // If observer is not supported, return undefined
  return;
}

module.exports = setupLcpMetricHandler;