/**
 * Initializes and tracks the Interaction to Next Paint (INP) metric, reporting changes and managing interaction entries.
 *
 * @param {Function} reportCallback - Callback function to report metric changes.
 * @param {Object} [options={}] - Optional configuration for metric tracking.
 * @param {number} [options.durationThreshold=40] - Minimum duration (ms) for an interaction to be considered.
 * @param {boolean} [options.reportAllChanges=false] - Whether to report all changes or only final value.
 * @returns {void}
 */
function initializeInteractionEventMetric(reportCallback, options = {}) {
  // Ensure the interaction count polyfill is initialized
  AIA.initInteractionCountPolyfill();

  // Initialize the INP metric object
  const inpMetric = q59.initMetric("INP");

  /**
   * Reports the current metric value using the provided callback.
   * Bound to the metric and reporting options.
   */
  const reportMetric = $59.bindReporter(reportCallback, inpMetric, options.reportAllChanges);

  /**
   * Handles new interaction entries and updates the metric as needed.
   *
   * @param {PerformanceEntryList} entries - List of performance entries to process.
   */
  const handleInteractionEntries = (entries) => {
    entries.forEach(entry => {
      // Track interaction if isBlobOrFileLikeObject has an interactionId
      if (entry.interactionId) {
        trackInteractionLatency(entry); // trackInteractionLatency
      }
      // For first-input entries, ensure they are not already tracked
      if (entry.entryType === "first-input") {
        const isAlreadyTracked = DU.some(tracked =>
          tracked.entries.some(trackedEntry =>
            entry.duration === trackedEntry.duration && entry.startTime === trackedEntry.startTime
          )
        );
        if (!isAlreadyTracked) {
          trackInteractionLatency(entry); // trackInteractionLatency
        }
      }
    });

    // Get the current slowest interaction entry
    const currentInteraction = getCurrentInteractionEntry(); // getCurrentInteractionEntry
    if (currentInteraction && currentInteraction.latency !== inpMetric.value) {
      inpMetric.value = currentInteraction.latency;
      inpMetric.entries = currentInteraction.entries;
      reportMetric();
    }
  };

  // Set up the event observer for user interactions
  const interactionObserver = M59.observe("event", handleInteractionEntries, {
    durationThreshold: options.durationThreshold || 40
  });

  if (interactionObserver) {
    // Observe first-input events (buffered for late listeners)
    interactionObserver.observe({
      type: "first-input",
      buffered: true
    });

    // Handle page/tab visibility changes
    L59.onHidden(() => {
      // Process any remaining records
      handleInteractionEntries(interactionObserver.takeRecords());
      // If no value was set but there were interactions, set value to 0
      if (inpMetric.value < 0 && BIA() > 0) {
        inpMetric.value = 0;
        inpMetric.entries = [];
      }
      // Final report on page hide
      reportMetric(true);
    });
  }
}

module.exports = initializeInteractionEventMetric;