/**
 * Extracts network protocol information and, if available, detailed HTTP timing attributes from a given resource timing entry.
 *
 * @param {Object} resourceTimingEntry - The resource timing entry object containing network protocol and timing information.
 * @returns {Array<Array<string, any>>} An array of key-value pairs representing protocol and timing attributes.
 */
function extractNetworkProtocolAndTimingAttributes(resourceTimingEntry) {
  // Extract protocol name and version using the parseNameAndVersion utility
  const {
    name: protocolName,
    version: protocolVersion
  } = parseNameAndVersion(resourceTimingEntry.nextHopProtocol);

  // Initialize the attributes array with protocol information
  const attributes = [
    ["network.protocol.version", protocolVersion],
    ["network.protocol.name", protocolName]
  ];

  // If browser performance time origin is not available, return only protocol info
  if (!aC.browserPerformanceTimeOrigin) {
    return attributes;
  }

  // Otherwise, add detailed HTTP timing attributes
  return [
    ...attributes,
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

module.exports = extractNetworkProtocolAndTimingAttributes;