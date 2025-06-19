/**
 * Observes a given source and reports its entries using the triggerInstrumentationHandlers function.
 * If the source is 'event', sets the duration threshold to 0 in the observer config.
 *
 * @param {string} sourceObservable - The name of the observable source to monitor (e.g., 'event').
 * @returns {void}
 */
function observeAndReportEntries(sourceObservable) {
  // Configuration object for the observer
  const config = {};

  // If the source is 'event', set the duration threshold to 0
  if (sourceObservable === "event") {
    config.durationThreshold = 0;
  }

  // Start observing the sourceObservable
  // When entries are observed, pass them to triggerInstrumentationHandlers for further processing
  a59.observe(
    sourceObservable,
    (entries) => {
      triggerInstrumentationHandlers(sourceObservable, {
        entries: entries
      });
    },
    config
  );
}

module.exports = observeAndReportEntries;