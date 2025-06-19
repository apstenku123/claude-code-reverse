/**
 * Records a browser resource performance metric as a child span/transaction.
 *
 * Skips recording for XHR and fetch requests. Extracts relevant timing and resource data,
 * determines origin/scheme, and starts a child span with the collected information.
 *
 * @param {object} parentSpan - The parent span or transaction to attach the child to.
 * @param {object} resourceEntry - The PerformanceResourceTiming entry for the resource.
 * @param {string} resourceUrl - The URL of the resource.
 * @param {number} startTimestampOffset - The offset (in ms) to add to the base timestamp for the start.
 * @param {number} duration - The duration (in ms) of the resource load.
 * @param {number} baseTimestamp - The base timestamp (in ms) to which offsets are added.
 * @returns {void}
 */
function recordResourcePerformanceMetric(parentSpan, resourceEntry, resourceUrl, startTimestampOffset, duration, baseTimestamp) {
  // Skip XHR and fetch resources
  if (resourceEntry.initiatorType === "xmlhttprequest" || resourceEntry.initiatorType === "fetch") {
    return;
  }

  // Parse the resource URL
  const parsedUrl = k8.parseUrl(resourceUrl);
  const resourceData = {};

  // Copy relevant size/timing data from the resource entry
  assignConfigValueIfValid(resourceData, resourceEntry, "transferSize", "http.response_transfer_size");
  assignConfigValueIfValid(resourceData, resourceEntry, "encodedBodySize", "http.response_content_length");
  assignConfigValueIfValid(resourceData, resourceEntry, "decodedBodySize", "http.decoded_response_content_length");

  // Add render blocking status if available
  if ("renderBlockingStatus" in resourceEntry) {
    resourceData["resource.render_blocking_status"] = resourceEntry.renderBlockingStatus;
  }

  // Add URL scheme (protocol) if available
  if (parsedUrl.protocol) {
    resourceData["url.scheme"] = parsedUrl.protocol.split(":").pop();
  }

  // Add server address (host) if available
  if (parsedUrl.host) {
    resourceData["server.address"] = parsedUrl.host;
  }

  // Determine if the resource is same-origin
  resourceData["url.same_origin"] = resourceUrl.includes(WU.WINDOW.location.origin);

  // Calculate absolute start and end timestamps
  const absoluteStartTimestamp = baseTimestamp + startTimestampOffset;
  const absoluteEndTimestamp = absoluteStartTimestamp + duration;

  // Start a child span/transaction for the resource
  FU._startChild(parentSpan, {
    description: resourceUrl.replace(WU.WINDOW.location.origin, ""),
    endTimestamp: absoluteEndTimestamp,
    op: resourceEntry.initiatorType ? `resource.${resourceEntry.initiatorType}` : "resource.other",
    origin: "auto.resource.browser.metrics",
    startTimestamp: absoluteStartTimestamp,
    data: resourceData
  });
}

module.exports = recordResourcePerformanceMetric;
