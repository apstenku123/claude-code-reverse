/**
 * Observes the First Input Delay (FID) metric and reports isBlobOrFileLikeObject using the provided reporter function.
 * Sets up a PerformanceObserver for 'first-input' events, calculates the FID value,
 * and ensures the metric is reported only if the event occurs before the page becomes hidden.
 * Cleans up observers when the page is hidden.
 *
 * @param {Function} reportCallback - Callback function to report the FID metric.
 * @returns {void}
 */
const observeFirstInputDelay = (reportCallback) => {
  // Get the visibility watcher to determine when the page is first hidden
  const visibilityWatcher = F59.getVisibilityWatcher();

  // Initialize the FID metric object
  const fidMetric = J59.initMetric("FID");

  // Will be assigned the bound reporter function
  let boundReporter;

  /**
   * Handles a single PerformanceEntry for 'first-input'.
   * Calculates FID and updates the metric if the event occurred before the page was hidden.
   * @param {PerformanceEventTiming} entry
   */
  const handleFirstInputEntry = (entry) => {
    if (entry.startTime < visibilityWatcher.firstHiddenTime) {
      // Calculate FID value
      fidMetric.value = entry.processingStart - entry.startTime;
      fidMetric.entries.push(entry);
      // Report the metric
      boundReporter(true);
    }
  };

  /**
   * Handles an array of PerformanceEntry objects.
   * @param {PerformanceEventTiming[]} entries
   */
  const handleFirstInputEntries = (entries) => {
    entries.forEach(handleFirstInputEntry);
  };

  // Observe 'first-input' events
  const firstInputObserver = X59.observe("first-input", handleFirstInputEntries);

  // Bind the reporter function to the metric
  boundReporter = W59.bindReporter(reportCallback, fidMetric);

  // If the observer was created, clean up when the page is hidden
  if (firstInputObserver) {
    C59.onHidden(() => {
      // Process any remaining entries before disconnecting
      handleFirstInputEntries(firstInputObserver.takeRecords());
      firstInputObserver.disconnect();
    }, true);
  }
};

module.exports = observeFirstInputDelay;