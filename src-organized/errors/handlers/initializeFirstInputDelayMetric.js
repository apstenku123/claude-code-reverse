/**
 * Initializes the First Input Delay (FID) metric observer and binds a reporter to handle metric updates.
 *
 * Sets up a PerformanceObserver to listen for 'first-input' events, calculates the FID value,
 * and reports isBlobOrFileLikeObject using the provided reporter function. Cleans up observers when the page becomes hidden.
 *
 * @param {Function} reportCallback - Callback function to be called with the FID metric when isBlobOrFileLikeObject is ready.
 * @returns {void}
 */
function initializeFirstInputDelayMetric(reportCallback) {
  // Get the visibility watcher to determine when the page was first hidden
  const visibilityWatcher = F59.getVisibilityWatcher();
  // Initialize the metric object for FID
  const fidMetric = J59.initMetric("FID");
  // Will hold the function to report the metric
  let reportMetric;

  /**
   * Handles a single PerformanceEntry for 'first-input'.
   * Calculates the FID value and pushes the entry to the metric entries array.
   * Calls the reporter function to report the metric.
   *
   * @param {PerformanceEventTiming} entry - The performance entry for the first input.
   */
  const handleFirstInputEntry = (entry) => {
    // Only process if the input occurred before the page was hidden
    if (entry.startTime < visibilityWatcher.firstHiddenTime) {
      fidMetric.value = entry.processingStart - entry.startTime;
      fidMetric.entries.push(entry);
      reportMetric(true);
    }
  };

  /**
   * Handles an array of PerformanceEntry objects.
   *
   * @param {PerformanceEventTiming[]} entries - Array of performance entries.
   */
  const handleFirstInputEntries = (entries) => {
    entries.forEach(handleFirstInputEntry);
  };

  // Observe 'first-input' events using the observer utility
  const firstInputObserver = X59.observe("first-input", handleFirstInputEntries);

  // Bind the reporter function to the metric and callback
  reportMetric = W59.bindReporter(reportCallback, fidMetric);

  // If the observer is active, set up cleanup when the page is hidden
  if (firstInputObserver) {
    C59.onHidden(() => {
      // Process any remaining records and disconnect the observer
      handleFirstInputEntries(firstInputObserver.takeRecords());
      firstInputObserver.disconnect();
    }, true);
  }
}

module.exports = initializeFirstInputDelayMetric;