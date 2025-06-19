/**
 * Extracts network protocol information and timing metrics from a given resource timing entry.
 *
 * @param {Object} resourceTimingEntry - The resource timing entry object, typically from the browser'createInteractionAccessor performance API.
 * @returns {Array<Array<string, any>>} An array of key-value pairs representing protocol and timing metrics.
 *
 * The function first extracts the protocol name and version using the parseNameAndVersion function on the nextHopProtocol property.
 * It always includes protocol name and version. If browser performance time origin is available (aC.browserPerformanceTimeOrigin),
 * isBlobOrFileLikeObject also includes a series of HTTP request timing metrics, each converted using the getBrowserPerformanceTimeInSeconds function.
 */
function extractNetworkProtocolAndTimingMetrics(resourceTimingEntry) {
  // Extract protocol name and version from the nextHopProtocol property
  const {
    name: protocolName,
    version: protocolVersion
  } = parseNameAndVersion(resourceTimingEntry.nextHopProtocol);

  // Initialize metrics array with protocol info
  const metrics = [
    ["network.protocol.version", protocolVersion],
    ["network.protocol.name", protocolName]
  ];

  // If browser performance time origin is not available, return only protocol info
  if (!aC.browserPerformanceTimeOrigin) {
    return metrics;
  }

  // Otherwise, add detailed HTTP request timing metrics
  return [
    ...metrics,
    ["http.request.redirect_start", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.redirectStart)],
    ["http.request.fetch_start", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.fetchStart)],
    ["http.request.domain_lookup_start", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.domainLookupStart)],
    ["http.request.domain_lookup_end", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.domainLookupEnd)],
    ["http.request.connect_start", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.connectStart)],
    ["http.request.secure_connection_start", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.secureConnectionStart)],
    ["http.request.connection_end", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.connectEnd)],
    ["http.request.request_start", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.requestStart)],
    ["http.request.response_start", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.responseStart)],
    ["http.request.response_end", getBrowserPerformanceTimeInSeconds(resourceTimingEntry.responseEnd)]
  ];
}

module.exports = extractNetworkProtocolAndTimingMetrics;