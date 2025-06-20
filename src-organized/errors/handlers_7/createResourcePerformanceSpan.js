/**
 * Creates a child performance span for a browser resource, excluding XHR and fetch requests.
 * Gathers relevant resource timing data and attaches isBlobOrFileLikeObject to the span for tracing/monitoring.
 *
 * @param {object} parentSpan - The parent span or transaction to which this resource span will be attached.
 * @param {object} resourceEntry - The resource timing entry (PerformanceResourceTiming) containing resource details.
 * @param {string} resourceUrl - The full URL of the resource being measured.
 * @param {number} startTimestamp - The start timestamp (in ms or createInteractionAccessor, depending on context) for the resource load.
 * @param {number} duration - The duration (in ms or createInteractionAccessor) of the resource load.
 * @param {number} baseTimestamp - The base timestamp (in ms or createInteractionAccessor) used to calculate absolute times.
 * @returns {void}
 */
function createResourcePerformanceSpan(parentSpan, resourceEntry, resourceUrl, startTimestamp, duration, baseTimestamp) {
  // Exclude XHR and fetch requests from resource spans
  if (resourceEntry.initiatorType === "xmlhttprequest" || resourceEntry.initiatorType === "fetch") {
    return;
  }

  // Parse the resource URL for protocol and host
  const parsedUrl = k8.parseUrl(resourceUrl);
  const resourceData = {};

  // Attach transfer and body size metrics if available
  assignConfigValueIfValid(resourceData, resourceEntry, "transferSize", "http.response_transfer_size");
  assignConfigValueIfValid(resourceData, resourceEntry, "encodedBodySize", "http.response_content_length");
  assignConfigValueIfValid(resourceData, resourceEntry, "decodedBodySize", "http.decoded_response_content_length");

  // Attach render blocking status if present
  if ("renderBlockingStatus" in resourceEntry) {
    resourceData["resource.render_blocking_status"] = resourceEntry.renderBlockingStatus;
  }

  // Attach protocol (scheme) and host if available
  if (parsedUrl.protocol) {
    resourceData["url.scheme"] = parsedUrl.protocol.split(":").pop();
  }
  if (parsedUrl.host) {
    resourceData["server.address"] = parsedUrl.host;
  }

  // Determine if the resource is same-origin
  resourceData["url.same_origin"] = resourceUrl.includes(WU.WINDOW.location.origin);

  // Calculate absolute start and end timestamps
  const absoluteStart = baseTimestamp + startTimestamp;
  const absoluteEnd = absoluteStart + duration;

  // Create a child span for this resource
  FU._startChild(parentSpan, {
    description: resourceUrl.replace(WU.WINDOW.location.origin, ""), // Remove origin for description
    endTimestamp: absoluteEnd,
    op: resourceEntry.initiatorType ? `resource.${resourceEntry.initiatorType}` : "resource.other",
    origin: "auto.resource.browser.metrics",
    startTimestamp: absoluteStart,
    data: resourceData
  });
}

module.exports = createResourcePerformanceSpan;