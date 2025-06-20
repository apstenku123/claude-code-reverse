/**
 * Records various browser network timing metrics as child spans on a transaction using browser performance timing data.
 *
 * @param {Observable} sourceObservable - The observable source for the metrics.
 * @param {Object} config - Configuration object for metric recording.
 * @param {Subscription} subscription - The subscription instance for managing metric recording lifecycle.
 * @returns {void}
 */
function recordAllBrowserNetworkMetrics(sourceObservable, config, subscription) {
  // List of standard browser network events to record
  const networkEvents = [
    "unloadEvent",
    "redirect",
    "domContentLoadedEvent",
    "loadEvent",
    "connect"
  ];

  // Record each standard network event
  networkEvents.forEach(eventName => {
    startBrowserMetricChildSpan(sourceObservable, config, eventName, subscription);
  });

  // Record secure connection timing (TLS/SSL handshake)
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "secureConnection",
    subscription,
    "TLS/SSL",
    "connectEnd"
  );

  // Record fetch event with cache and domain lookup start
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "fetch",
    subscription,
    "cache",
    "domainLookupStart"
  );

  // Record domain lookup timing (DNS)
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "domainLookup",
    subscription,
    "DNS"
  );

  // Record all browser network metrics using the helper function
  recordBrowserNetworkMetrics(sourceObservable, config, subscription);
}

module.exports = recordAllBrowserNetworkMetrics;