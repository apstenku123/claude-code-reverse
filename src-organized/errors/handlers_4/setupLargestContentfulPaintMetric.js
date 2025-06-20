/**
 * Sets up a metric observer for Largest Contentful Paint (LCP) and binds a reporter to the provided callback.
 * The function observes the 'largest-contentful-paint' performance entry, calculates the LCP value,
 * and reports isBlobOrFileLikeObject when appropriate. It also ensures the metric is reported on user interaction or when the page is hidden.
 *
 * @param {Function} reportCallback - Callback function to be called with the LCP metric when isBlobOrFileLikeObject is ready.
 * @returns {Function|undefined} Returns a cleanup/reporting function if observation is set up, otherwise undefined.
 */
function setupLargestContentfulPaintMetric(reportCallback) {
  // Get the visibility watcher to determine when the page becomes hidden
  const visibilityWatcher = j59.getVisibilityWatcher();
  // Initialize the LCP metric object
  const lcpMetric = k59.initMetric("LCP");
  let reportLCP;

  /**
   * Handles new LCP entries and updates the metric if appropriate.
   * @param {PerformanceEntryList} lcpEntries - Array of LCP performance entries
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
    // Bind the reporter to the provided callback and metric
    reportLCP = S59.bindReporter(reportCallback, lcpMetric);

    /**
     * Finalizes and reports the LCP metric, disconnects the observer, and prevents duplicate reporting.
     */
    const finalizeLCP = () => {
      if (!GIA[lcpMetric.id]) {
        // Process any remaining entries
        handleLCPEntries(lcpObserver.takeRecords());
        // Disconnect the observer to stop listening for new entries
        lcpObserver.disconnect();
        // Mark this metric as reported
        GIA[lcpMetric.id] = true;
        // Report the metric (with isFinal = true)
        reportLCP(true);
      }
    };

    // Listen for user interactions that should trigger LCP reporting
    ["keydown", "click"].forEach(eventType => {
      if (P59.WINDOW.document) {
        addEventListener(eventType, finalizeLCP, {
          once: true,
          capture: true
        });
      }
    });

    // Also report LCP when the page is hidden
    x59.onHidden(finalizeLCP, true);

    // Return the finalize function for potential manual invocation
    return finalizeLCP;
  }

  // If observer could not be set up, return undefined
  return;
}

module.exports = setupLargestContentfulPaintMetric;