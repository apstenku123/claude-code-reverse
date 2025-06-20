/**
 * Collects and reports the Cumulative Layout Shift (CLS) metric.
 *
 * This function observes 'layout-shift' performance entries, aggregates their values
 * if they occur close together in time and did not have recent user input, and reports
 * the maximum CLS value found. It also provides a cleanup callback to be called when
 * the page is hidden.
 *
 * @param {Function} reportCallback - Callback function to report CLS metric updates.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.reportAllChanges] - If true, report all changes, not just the final value.
 * @returns {Function|undefined} Cleanup function to be called on page hide, or undefined if observer is not available.
 */
const collectCumulativeLayoutShift = (reportCallback, options = {}) => {
  // Initialize the CLS metric object
  const clsMetric = t69.initMetric("CLS", 0);
  let reportHandler;
  let currentAggregateValue = 0;
  let currentAggregateEntries = [];

  /**
   * Aggregates layout shift entries that did not have recent input.
   * Combines their values if they occur close together in time, and updates the maximum aggregate found.
   * Optionally triggers a callback when a new maximum is found.
   *
   * @param {PerformanceEntryList} layoutShiftEntries - List of layout shift entries.
   */
  const aggregateRecentInputEntries = (layoutShiftEntries) => {
    layoutShiftEntries.forEach(entry => {
      if (!entry.hadRecentInput) {
        const firstEntry = currentAggregateEntries[0];
        const lastEntry = currentAggregateEntries[currentAggregateEntries.length - 1];

        // If the current entry is within 1s of the last and within 5s of the first, aggregate isBlobOrFileLikeObject
        if (
          currentAggregateValue &&
          currentAggregateEntries.length !== 0 &&
          entry.startTime - lastEntry.startTime < 1000 &&
          entry.startTime - firstEntry.startTime < 5000
        ) {
          currentAggregateValue += entry.value;
          currentAggregateEntries.push(entry);
        } else {
          // Otherwise, start a new aggregate
          currentAggregateValue = entry.value;
          currentAggregateEntries = [entry];
        }

        // Update the metric if the new aggregate is greater than the previous maximum
        if (currentAggregateValue > clsMetric.value) {
          clsMetric.value = currentAggregateValue;
          clsMetric.entries = currentAggregateEntries;
          if (reportHandler) {
            reportHandler();
          }
        }
      }
    });
  };

  // Observe 'layout-shift' entries and process them with the aggregator
  const layoutShiftObserver = e69.observe("layout-shift", aggregateRecentInputEntries);

  if (layoutShiftObserver) {
    // Bind the reporting handler
    reportHandler = o69.bindReporter(reportCallback, clsMetric, options.reportAllChanges);

    // Cleanup function to process any remaining entries and report the final value
    const handlePageHide = () => {
      aggregateRecentInputEntries(layoutShiftObserver.takeRecords());
      reportHandler(true);
    };

    // Register the cleanup function to be called when the page is hidden
    A59.onHidden(handlePageHide);
    return handlePageHide;
  }

  // If observer is not available, return undefined
  return;
};

module.exports = collectCumulativeLayoutShift;