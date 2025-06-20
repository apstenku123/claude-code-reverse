/**
 * Records various browser network timing metrics as child operations on the given observable.
 * This function delegates to startBrowserMetricChildSpan for specific timing phases and to recordBrowserNetworkMetrics for overall metrics.
 *
 * @param {Observable} sourceObservable - The observable to which timing metrics are attached.
 * @param {Object} config - Configuration object containing timing data and other relevant info.
 * @param {Subscription} subscription - The subscription or context for which metrics are being recorded.
 * @returns {void}
 */
function recordAllNetworkTimingMetrics(sourceObservable, config, subscription) {
  // List of standard timing phases to record
  const timingPhases = [
    "unloadEvent",
    "redirect",
    "domContentLoadedEvent",
    "loadEvent",
    "connect"
  ];

  // Record each standard timing phase
  timingPhases.forEach(phase => {
    startBrowserMetricChildSpan(sourceObservable, config, phase, subscription);
  });

  // Record secure connection timing with additional labels
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "secureConnection",
    subscription,
    "TLS/SSL",
    "connectEnd"
  );

  // Record fetch timing with additional labels
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "fetch",
    subscription,
    "cache",
    "domainLookupStart"
  );

  // Record domain lookup timing with additional label
  startBrowserMetricChildSpan(
    sourceObservable,
    config,
    "domainLookup",
    subscription,
    "DNS"
  );

  // Record overall browser network metrics
  recordBrowserNetworkMetrics(sourceObservable, config, subscription);
}

module.exports = recordAllNetworkTimingMetrics;