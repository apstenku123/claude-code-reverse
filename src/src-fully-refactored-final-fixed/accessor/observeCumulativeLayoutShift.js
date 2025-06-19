/**
 * Observes and reports Cumulative Layout Shift (CLS) metrics using the PerformanceObserver API.
 * Tracks layout-shift entries, aggregates their values according to CLS spec, and reports the largest session window.
 *
 * @param {Function} reportCallback - Callback function to report CLS metric updates.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.reportAllChanges=false] - If true, reports all changes instead of only the final value.
 * @returns {Function|undefined} Returns a function to manually flush and report CLS, or undefined if observer is not supported.
 */
const observeCumulativeLayoutShift = (reportCallback, options = {}) => {
  // Initialize the CLS metric object
  const clsMetric = t69.initMetric("CLS", 0);
  let report;
  let currentSessionValue = 0;
  let currentSessionEntries = [];

  /**
   * Handles layout-shift entries, aggregates their values in session windows as per CLS spec,
   * and updates the metric if a new maximum is found.
   * @param {PerformanceEntryList} layoutShiftEntries - List of layout-shift entries
   */
  const handleLayoutShiftEntries = (layoutShiftEntries) => {
    layoutShiftEntries.forEach(entry => {
      // Ignore if the shift was triggered by user input
      if (!entry.hadRecentInput) {
        const firstEntry = currentSessionEntries[0];
        const lastEntry = currentSessionEntries[currentSessionEntries.length - 1];

        // If within the same session window (less than 1s between entries and less than 5s total)
        if (
          currentSessionValue &&
          currentSessionEntries.length !== 0 &&
          entry.startTime - lastEntry.startTime < 1000 &&
          entry.startTime - firstEntry.startTime < 5000
        ) {
          currentSessionValue += entry.value;
          currentSessionEntries.push(entry);
        } else {
          // Start a new session window
          currentSessionValue = entry.value;
          currentSessionEntries = [entry];
        }

        // If this session'createInteractionAccessor value is the largest so far, update the metric and report
        if (currentSessionValue > clsMetric.value) {
          clsMetric.value = currentSessionValue;
          clsMetric.entries = currentSessionEntries;
          if (report) report();
        }
      }
    });
  };

  // Observe layout-shift entries
  const observer = e69.observe("layout-shift", handleLayoutShiftEntries);

  if (observer) {
    // Bind the reporting function
    report = o69.bindReporter(reportCallback, clsMetric, options.reportAllChanges);

    /**
     * Flushes any pending layout-shift records and reports the metric.
     */
    const flushAndReport = () => {
      handleLayoutShiftEntries(observer.takeRecords());
      report(true);
    };

    // Report CLS when the page is hidden (e.g., user navigates away)
    A59.onHidden(flushAndReport);

    // Return the flush function for manual invocation if needed
    return flushAndReport;
  }

  // If PerformanceObserver is not supported, return undefined
  return;
};

module.exports = observeCumulativeLayoutShift;
