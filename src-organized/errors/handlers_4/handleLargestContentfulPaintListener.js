/**
 * Sets up event listeners and observers to track the Largest Contentful Paint (LCP) metric.
 * When the LCP event is detected and meets certain visibility and timing criteria, the metric is reported.
 * Also ensures that user interactions (keydown, click) and page visibility changes trigger a final LCP check and cleanup.
 *
 * @param {Function} reportCallback - Callback function to be called with the LCP metric when isBlobOrFileLikeObject is ready to be reported.
 * @returns {Function|undefined} Cleanup function to manually trigger the final LCP check, or undefined if observer could not be created.
 */
function handleLargestContentfulPaintListener(reportCallback) {
  // Get the visibility watcher to determine when the page was first hidden
  const visibilityWatcher = j59.getVisibilityWatcher();
  // Initialize the LCP metric object
  const lcpMetric = k59.initMetric("LCP");
  let report;

  /**
   * Handles LCP performance entries.
   * @param {PerformanceEntryList} entries - List of LCP entries.
   */
  const handleLcpEntries = (entries) => {
    // Get the most recent LCP entry
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      // Calculate the LCP time relative to activation start
      const lcpTime = Math.max(
        lastEntry.startTime - _59.getActivationStart(),
        0
      );
      // Only report if the LCP occurred before the page was hidden
      if (lcpTime < visibilityWatcher.firstHiddenTime) {
        lcpMetric.value = lcpTime;
        lcpMetric.entries = [lastEntry];
        report();
      }
    }
  };

  // Observe LCP entries
  const lcpObserver = y59.observe("largest-contentful-paint", handleLcpEntries);
  if (lcpObserver) {
    // Bind the reporter to the provided callback and metric
    report = S59.bindReporter(reportCallback, lcpMetric);

    /**
     * Finalizes LCP measurement and cleans up observers and listeners.
     */
    const finalizeLcp = () => {
      // Only finalize if this LCP metric hasn'processRuleBeginHandlers been finalized yet
      if (!GIA[lcpMetric.id]) {
        // Process any remaining LCP entries
        handleLcpEntries(lcpObserver.takeRecords());
        // Disconnect the observer
        lcpObserver.disconnect();
        // Mark this metric as finalized
        GIA[lcpMetric.id] = true;
        // Report the metric one last time
        report(true);
      }
    };

    // Listen for user interactions that should finalize LCP
    ["keydown", "click"].forEach((eventType) => {
      if (P59.WINDOW.document) {
        addEventListener(eventType, finalizeLcp, {
          once: true,
          capture: true
        });
      }
    });

    // Also finalize LCP when the page becomes hidden
    x59.onHidden(finalizeLcp, true);

    // Return the cleanup function
    return finalizeLcp;
  }
  // If observer could not be created, return undefined
  return;
}

module.exports = handleLargestContentfulPaintListener;