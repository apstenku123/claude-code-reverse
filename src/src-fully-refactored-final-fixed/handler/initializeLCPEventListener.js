/**
 * Sets up an event listener to track the Largest Contentful Paint (LCP) metric and report isBlobOrFileLikeObject upon user interaction or page visibility changes.
 *
 * @param {Function} reportCallback - Callback function to report the LCP metric.
 * @returns {Function|undefined} Returns the handler function that finalizes LCP reporting, or undefined if observer is not available.
 */
function initializeLCPEventListener(reportCallback) {
  // Get the visibility watcher to determine when the page was first hidden
  const visibilityWatcher = j59.getVisibilityWatcher();
  // Initialize the LCP metric object
  const lcpMetric = k59.initMetric("LCP");
  let reportLCP;

  /**
   * Handles LCP entries and updates the metric if valid
   * @param {Array} lcpEntries - Array of LCP PerformanceEntry objects
   */
  const handleLCPEntries = (lcpEntries) => {
    // Get the most recent LCP entry
    const latestEntry = lcpEntries[lcpEntries.length - 1];
    if (latestEntry) {
      // Calculate the LCP time relative to activation start
      const lcpTime = Math.max(latestEntry.startTime - _59.getActivationStart(), 0);
      // Only update if the LCP occurred before the page was hidden
      if (lcpTime < visibilityWatcher.firstHiddenTime) {
        lcpMetric.value = lcpTime;
        lcpMetric.entries = [latestEntry];
        reportLCP();
      }
    }
  };

  // Observe 'largest-contentful-paint' entries
  const lcpObserver = y59.observe("largest-contentful-paint", handleLCPEntries);
  if (lcpObserver) {
    // Bind the reporter to the callback and metric
    reportLCP = S59.bindReporter(reportCallback, lcpMetric);

    /**
     * Finalizes LCP reporting and disconnects the observer
     */
    const finalizeLCPReporting = () => {
      if (!GIA[lcpMetric.id]) {
        // Process any remaining LCP entries
        handleLCPEntries(lcpObserver.takeRecords());
        // Disconnect the observer to stop receiving entries
        lcpObserver.disconnect();
        // Mark this metric as reported
        GIA[lcpMetric.id] = true;
        // Report the metric (force report)
        reportLCP(true);
      }
    };

    // Listen for user interactions that should finalize LCP reporting
    ["keydown", "click"].forEach(eventType => {
      if (P59.WINDOW.document) {
        addEventListener(eventType, finalizeLCPReporting, {
          once: true,
          capture: true
        });
      }
    });

    // Also finalize LCP reporting when the page is hidden
    x59.onHidden(finalizeLCPReporting, true);

    // Return the handler for possible external use
    return finalizeLCPReporting;
  }
  // If observer is not available, return undefined
  return;
}

module.exports = initializeLCPEventListener;