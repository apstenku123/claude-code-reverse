/**
 * Processes a set of browser event timings and invokes the appropriate handlers.
 *
 * @param {object} sourceObservable - The source object or observable containing event data.
 * @param {object} config - Configuration object for event processing.
 * @param {object} subscription - Subscription or context object for event handling.
 * @returns {void}
 *
 * This function iterates over a predefined list of browser event timing phases and calls the `startBrowserMetricChildSpan` handler for each. It then calls `startBrowserMetricChildSpan` for additional specific event phases with extra context, and finally invokes `k89` for any final processing.
 */
function processEventTimings(sourceObservable, config, subscription) {
  // List of standard browser event timing phases to process
  const eventPhases = [
    "unloadEvent",
    "redirect",
    "domContentLoadedEvent",
    "loadEvent",
    "connect"
  ];

  // Process each standard event phase
  eventPhases.forEach((eventPhase) => {
    startBrowserMetricChildSpan(sourceObservable, config, eventPhase, subscription);
  });

  // Process secure connection timing with additional context
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "secureConnection",
    subscription,
    "TLS/SSL", // protocol
    "connectEnd" // related phase
  );

  // Process fetch timing with additional context
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "fetch",
    subscription,
    "cache", // cache status
    "domainLookupStart" // related phase
  );

  // Process domain lookup timing with additional context
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "domainLookup",
    subscription,
    "DNS" // lookup type
  );

  // Final processing step
  k89(sourceObservable, config, subscription);
}

module.exports = processEventTimings;