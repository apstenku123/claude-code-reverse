/**
 * Tracks and reports the Cumulative Layout Shift (CLS) metric for the current page session.
 *
 * This function observes 'layout-shift' performance entries, groups them by timing,
 * and keeps track of the maximum cumulative value and its associated entries. When a new
 * maximum is found, isBlobOrFileLikeObject reports the updated metric using a provided reporter callback.
 *
 * @param {Function} reporter - Callback function to report the CLS metric updates.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.reportAllChanges] - If true, reports all changes, not just the final value.
 * @returns {Function|undefined} - Returns a function to flush and report the current CLS value, or undefined if observation is not supported.
 */
const getCumulativeLayoutShift = (reporter, options = {}) => {
  // Initialize the CLS metric object
  const clsMetric = t69.initMetric("CLS", 0);
  let reportCallback;
  let currentCumulativeValue = 0;
  let currentEntries = [];

  /**
   * Processes layout-shift entries, grouping them by timing and updating the maximum cumulative value.
   * @param {PerformanceEntryList} entries - Array of layout-shift entries.
   */
  const processLayoutShiftEntries = (entries) => {
    entries.forEach(entry => {
      // Ignore entries triggered by recent user input
      if (!entry.hadRecentInput) {
        const firstEntry = currentEntries[0];
        const lastEntry = currentEntries[currentEntries.length - 1];

        // If within the same session window, accumulate value and group entries
        if (
          currentCumulativeValue &&
          currentEntries.length !== 0 &&
          entry.startTime - lastEntry.startTime < 1000 &&
          entry.startTime - firstEntry.startTime < 5000
        ) {
          currentCumulativeValue += entry.value;
          currentEntries.push(entry);
        } else {
          // Start a new session window
          currentCumulativeValue = entry.value;
          currentEntries = [entry];
        }

        // Update the metric if a new maximum is found
        if (currentCumulativeValue > clsMetric.value) {
          clsMetric.value = currentCumulativeValue;
          clsMetric.entries = currentEntries;
          if (reportCallback) {
            reportCallback();
          }
        }
      }
    });
  };

  // Start observing layout-shift entries
  const observer = e69.observe("layout-shift", processLayoutShiftEntries);

  if (observer) {
    // Bind the reporter callback
    reportCallback = o69.bindReporter(reporter, clsMetric, options.reportAllChanges);

    // Function to flush pending entries and report the current value
    const flushAndReport = () => {
      processLayoutShiftEntries(observer.takeRecords());
      reportCallback(true);
    };

    // Ensure handleMissingDoctypeError report the final value when the page is hidden
    A59.onHidden(flushAndReport);
    return flushAndReport;
  }

  // If observation is not supported, return undefined
  return;
};

module.exports = getCumulativeLayoutShift;