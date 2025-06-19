/**
 * Initializes tracking for user interaction events and reports interaction latency metrics.
 *
 * This function sets up observers for user interaction events (such as 'first-input'),
 * tracks their latency, and reports metrics using a provided reporter function.
 * It also ensures polyfills and cleanup logic are in place for accurate metric collection.
 *
 * @param {Function} reporter - Callback function to report metric updates.
 * @param {Object} [options={}] - Optional configuration for metric tracking.
 * @param {number} [options.durationThreshold=40] - Minimum event duration (ms) to be considered.
 * @param {boolean} [options.reportAllChanges] - If true, report all metric changes, not just the final value.
 * @returns {void}
 */
function initializeInteractionEventTracking(reporter, options = {}) {
  // Ensure the interaction count polyfill is initialized
  AIA.initInteractionCountPolyfill();

  // Initialize the metric object for Interaction to Next Paint (INP)
  const inpMetric = q59.initMetric("INP");

  /**
   * Handles new event entries by tracking latency and updating the metric if needed.
   * @param {PerformanceEntryList} entries - List of performance entries to process.
   */
  const handleEventEntries = (entries) => {
    entries.forEach(entry => {
      // If the entry has an interactionId, track its latency
      if (entry.interactionId) {
        trackInteractionLatency(entry);
      }
      // For 'first-input' entries, ensure they are not already tracked
      if (entry.entryType === "first-input") {
        const alreadyTracked = DU.some(tracked =>
          tracked.entries.some(trackedEntry =>
            entry.duration === trackedEntry.duration && entry.startTime === trackedEntry.startTime
          )
        );
        if (!alreadyTracked) {
          trackInteractionLatency(entry);
        }
      }
    });

    // Get the current top interaction entry
    const currentInteraction = getCurrentInteractionEntry();
    // If the latency has changed, update the metric and report
    if (currentInteraction && currentInteraction.latency !== inpMetric.value) {
      inpMetric.value = currentInteraction.latency;
      inpMetric.entries = currentInteraction.entries;
      reportMetric();
    }
  };

  // Set up the event observer for user interaction events
  const eventObserver = M59.observe("event", handleEventEntries, {
    durationThreshold: options.durationThreshold || 40
  });

  // Bind the reporter function to the metric
  const reportMetric = $59.bindReporter(reporter, inpMetric, options.reportAllChanges);

  if (eventObserver) {
    // Observe 'first-input' events, including buffered events
    eventObserver.observe({
      type: "first-input",
      buffered: true
    });

    // On page hide, process any remaining records and finalize the metric
    L59.onHidden(() => {
      handleEventEntries(eventObserver.takeRecords());
      // If no valid value but there were interactions, set value to 0
      if (inpMetric.value < 0 && BIA() > 0) {
        inpMetric.value = 0;
        inpMetric.entries = [];
      }
      reportMetric(true);
    });
  }
}

module.exports = initializeInteractionEventTracking;