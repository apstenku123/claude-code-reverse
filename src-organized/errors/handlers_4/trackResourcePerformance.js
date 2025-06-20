/**
 * Tracks and records browser resource performance metrics for a given resource, unless isBlobOrFileLikeObject is an XHR or fetch request.
 *
 * @param {object} transactionParent - The parent transaction or span to which the resource metric will be attached.
 * @param {object} resourceEntry - The PerformanceResourceTiming entry representing the resource.
 * @param {string} resourceUrl - The URL of the resource being measured.
 * @param {number} resourceStartTimestamp - The start timestamp (in seconds) for the resource load.
 * @param {number} resourceDuration - The duration (in seconds) of the resource load.
 * @param {number} resourceStartOffset - The offset (in seconds) from the transaction start to the resource start.
 * @returns {void}
 *
 * This function parses the resource URL, collects relevant performance metrics, and attaches them as a child span to the parent transaction.
 */
function trackResourcePerformance(
  transactionParent,
  resourceEntry,
  resourceUrl,
  resourceStartOffset,
  resourceDuration,
  resourceStartTimestamp
) {
  // Ignore XHR and fetch requests, as they are tracked elsewhere
  if (
    resourceEntry.initiatorType === "xmlhttprequest" ||
    resourceEntry.initiatorType === "fetch"
  ) {
    return;
  }

  // Parse the resource URL to extract protocol and host
  const parsedUrl = k8.parseUrl(resourceUrl);
  const resourceData = {};

  // Attach transfer size and body size metrics if present
  assignConfigValueIfValid(resourceData, resourceEntry, "transferSize", "http.response_transfer_size");
  assignConfigValueIfValid(resourceData, resourceEntry, "encodedBodySize", "http.response_content_length");
  assignConfigValueIfValid(resourceData, resourceEntry, "decodedBodySize", "http.decoded_response_content_length");

  // Attach render blocking status if available
  if ("renderBlockingStatus" in resourceEntry) {
    resourceData["resource.render_blocking_status"] = resourceEntry.renderBlockingStatus;
  }

  // Attach protocol (scheme) if available
  if (parsedUrl.protocol) {
    resourceData["url.scheme"] = parsedUrl.protocol.split(":").pop();
  }

  // Attach host (server address) if available
  if (parsedUrl.host) {
    resourceData["server.address"] = parsedUrl.host;
  }

  // Determine if the resource is same-origin
  resourceData["url.same_origin"] = resourceUrl.includes(WU.WINDOW.location.origin);

  // Calculate absolute start and end timestamps for the resource
  const absoluteStartTimestamp = resourceStartTimestamp + resourceStartOffset;
  const absoluteEndTimestamp = absoluteStartTimestamp + resourceDuration;

  // Start a child span for this resource in the transaction
  FU._startChild(transactionParent, {
    description: resourceUrl.replace(WU.WINDOW.location.origin, ""),
    endTimestamp: absoluteEndTimestamp,
    op: resourceEntry.initiatorType
      ? `resource.${resourceEntry.initiatorType}`
      : "resource.other",
    origin: "auto.resource.browser.metrics",
    startTimestamp: absoluteStartTimestamp,
    data: resourceData
  });
}

module.exports = trackResourcePerformance;