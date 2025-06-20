/**
 * Observes a given source (such as an event or observable), processes its entries,
 * and passes them to a handler for further processing. Optionally applies a duration threshold
 * configuration if the source is an 'event'.
 *
 * @param {string} sourceObservable - The name or type of the observable/event to observe.
 * @returns {void}
 */
function observeAndProcessEntries(sourceObservable) {
  // Configuration object for observation options
  const config = {};

  // If the source is an 'event', set the duration threshold to 0
  if (sourceObservable === "event") {
    config.durationThreshold = 0;
  }

  // Observe the source and process incoming entries
  a59.observe(
    sourceObservable,
    (subscription) => {
      // Pass the observed entries to the processing handler
      triggerInstrumentationHandlers(sourceObservable, {
        entries: subscription
      });
    },
    config
  );
}

module.exports = observeAndProcessEntries;