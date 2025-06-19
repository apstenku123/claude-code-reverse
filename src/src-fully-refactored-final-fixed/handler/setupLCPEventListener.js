/**
 * Sets up an event listener to track the Largest Contentful Paint (LCP) metric.
 * Observes the 'largest-contentful-paint' performance entry and reports the LCP value
 * when a user interaction (keydown or click) occurs or when the page is hidden.
 *
 * @param {Function} reportCallback - Callback function to report the LCP metric.
 * @returns {Function|undefined} Returns a cleanup function to manually trigger the LCP reporting, or undefined if observer is not supported.
 */
function setupLCPEventListener(reportCallback) {
  // Get the visibility watcher to determine when the page is hidden
  const visibilityWatcher = j59.getVisibilityWatcher();
  // Initialize the LCP metric object
  const lcpMetric = k59.initMetric("LCP");
  let reportLCP;

  /**
   * Handles the LCP entries and updates the metric if a valid entry is found.
   * @param {PerformanceEntryList} lcpEntries - Array of LCP performance entries.
   */
  const handleLCPEntries = (lcpEntries) => {
    // Get the most recent LCP entry
    const lastEntry = lcpEntries[lcpEntries.length - 1];
    if (lastEntry) {
      // Calculate the LCP time relative to activation start
      const lcpTime = Math.max(lastEntry.startTime - _59.getActivationStart(), 0);
      // Only update if the LCP occurred before the page was hidden
      if (lcpTime < visibilityWatcher.firstHiddenTime) {
        lcpMetric.value = lcpTime;
        lcpMetric.entries = [lastEntry];
        reportLCP();
      }
    }
  };

  // Observe the 'largest-contentful-paint' performance entry
  const lcpObserver = y59.observe("largest-contentful-paint", handleLCPEntries);

  if (lcpObserver) {
    // Bind the reporter to the provided callback and metric
    reportLCP = S59.bindReporter(reportCallback, lcpMetric);

    /**
     * Finalizes the LCP metric reporting and disconnects the observer.
     */
    const finalizeLCP = () => {
      if (!GIA[lcpMetric.id]) {
        // Process any remaining LCP entries
        handleLCPEntries(lcpObserver.takeRecords());
        // Disconnect the observer to prevent further updates
        lcpObserver.disconnect();
        // Mark this metric as reported
        GIA[lcpMetric.id] = true;
        // Report the LCP metric (force immediate reporting)
        reportLCP(true);
      }
    };

    // Listen for user interactions that should trigger LCP reporting
    ["keydown", "click"].forEach((eventType) => {
      if (P59.WINDOW.document) {
        addEventListener(eventType, finalizeLCP, {
          once: true,
          capture: true
        });
      }
    });

    // Also trigger LCP reporting when the page is hidden
    x59.onHidden(finalizeLCP, true);

    // Return the cleanup function
    return finalizeLCP;
  }

  // If the observer is not supported, return undefined
  return;
}

module.exports = setupLCPEventListener;