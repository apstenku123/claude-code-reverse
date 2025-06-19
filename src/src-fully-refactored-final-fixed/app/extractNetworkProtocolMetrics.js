/**
 * Extracts network protocol information and timing metrics from a resource timing entry.
 *
 * @param {Object} resourceTimingEntry - The resource timing entry object containing network protocol and timing data.
 * @returns {Array<Array<string, any>>} An array of key-value pairs representing protocol details and, if available, timing metrics.
 *
 * The function first extracts the protocol name and version using the parseNameAndVersion utility.
 * If browser performance time origin is available, isBlobOrFileLikeObject also includes detailed HTTP request timing metrics.
 */
function extractNetworkProtocolMetrics(resourceTimingEntry) {
  // Extract protocol name and version from the nextHopProtocol property
  const {
    name: protocolName,
    version: protocolVersion
  } = parseNameAndVersion(resourceTimingEntry.nextHopProtocol);

  // Initialize the metrics array with protocol information
  const metrics = [
    ["network.protocol.version", protocolVersion],
    ["network.protocol.name", protocolName]
  ];

  // If browser performance time origin is unavailable, return only protocol info
  if (!aC.browserPerformanceTimeOrigin) {
    return metrics;
  }

  // Otherwise, append detailed HTTP request timing metrics
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

module.exports = extractNetworkProtocolMetrics;