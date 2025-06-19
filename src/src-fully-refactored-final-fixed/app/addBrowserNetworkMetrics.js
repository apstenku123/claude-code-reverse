/**
 * Adds browser network metric spans (such as unload, redirect, DOMContentLoaded, etc.)
 * as child operations to a transaction, based on browser timing metrics.
 *
 * @param {Observable} sourceObservable - The observable or source object containing browser timing metrics.
 * @param {Object} config - Configuration object for metric span creation.
 * @param {Subscription} subscription - The subscription or context for span creation.
 * @returns {void}
 */
function addBrowserNetworkMetrics(sourceObservable, config, subscription) {
  // List of browser events to process with default parameters
  const browserEvents = [
    "unloadEvent",
    "redirect",
    "domContentLoadedEvent",
    "loadEvent",
    "connect"
  ];

  // For each browser event, create a metric span
  browserEvents.forEach(eventName => {
    startBrowserMetricChildSpan(sourceObservable, config, eventName, subscription);
  });

  // Create a metric span for secure connection with additional details
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "secureConnection",
    subscription,
    "TLS/SSL", // protocol
    "connectEnd" // end event
  );

  // Create a metric span for fetch with additional details
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "fetch",
    subscription,
    "cache", // cache event
    "domainLookupStart" // start event
  );

  // Create a metric span for domain lookup with additional details
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "domainLookup",
    subscription,
    "DNS" // protocol
  );

  // Add browser network metric spans as child operations to the transaction
  k89(sourceObservable, config, subscription);
}

module.exports = addBrowserNetworkMetrics;