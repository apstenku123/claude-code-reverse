/**
 * Initializes and observes the INP (Interaction to Next Paint) metric, reporting changes as needed.
 *
 * This function sets up observers for user interaction events, tracks the INP metric, and reports updates
 * using a provided reporter function. It also handles polyfills, deduplication, and page visibility changes.
 *
 * @param {Function} reportCallback - Callback function to report metric changes.
 * @param {Object} [options={}] - Optional configuration for the metric observer.
 * @param {number} [options.durationThreshold=40] - Minimum duration (ms) for an event to be considered.
 * @param {boolean} [options.reportAllChanges] - Whether to report all changes or only final value.
 * @returns {void}
 */
function initializeInteractionToNextPaintMetric(reportCallback, options = {}) {
  // Ensure the interaction count polyfill is initialized
  AIA.initInteractionCountPolyfill();

  // Initialize the INP metric object
  const inpMetric = q59.initMetric("INP");

  /**
   * Handles new performance entries and updates the metric if needed.
   * @param {PerformanceEntryList} entries - List of new performance entries
   */
  const handleEntries = (entries) => {
    entries.forEach(entry => {
      // If the entry has an interactionId, process isBlobOrFileLikeObject
      if (entry.interactionId) {
        trackInteractionLatency(entry);
      }
      // For first-input entries, deduplicate against DU
      if (entry.entryType === "first-input") {
        const isDuplicate = DU.some(duItem =>
          duItem.entries.some(duEntry =>
            entry.duration === duEntry.duration && entry.startTime === duEntry.startTime
          )
        );
        if (!isDuplicate) {
          trackInteractionLatency(entry);
        }
      }
    });

    // Get the latest INP value
    const latestINP = getCurrentInteractionEntry();
    // If the value has changed, update and report
    if (latestINP && latestINP.latency !== inpMetric.value) {
      inpMetric.value = latestINP.latency;
      inpMetric.entries = latestINP.entries;
      reportMetric();
    }
  };

  // Observe interaction events with the specified duration threshold
  const eventObserver = M59.observe("event", handleEntries, {
    durationThreshold: options.durationThreshold || 40
  });

  // Bind the reporter function to the metric
  const reportMetric = $59.bindReporter(reportCallback, inpMetric, options.reportAllChanges);

  if (eventObserver) {
    // Observe first-input events (buffered for late listeners)
    eventObserver.observe({
      type: "first-input",
      buffered: true
    });

    // Handle page visibility changes (e.g., when the page is hidden)
    L59.onHidden(() => {
      // Process any remaining records
      handleEntries(eventObserver.takeRecords());
      // If the value is negative but there were interactions, set to zero
      if (inpMetric.value < 0 && BIA() > 0) {
        inpMetric.value = 0;
        inpMetric.entries = [];
      }
      // Report the final value
      reportMetric(true);
    });
  }
}

module.exports = initializeInteractionToNextPaintMetric;