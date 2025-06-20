/**
 * Records browser network timing metrics as child operations on a given transaction or span.
 *
 * This function checks if the responseEnd timing is available in the provided networkTiming object. If so,
 * isBlobOrFileLikeObject creates two child spans: one for the request phase and one for the response phase, using the provided
 * baseTimestamp as a reference. The timing offsets are calculated using the helper function parseTimingOffset.
 *
 * @param {Object} parentSpan - The parent transaction or span to which child spans will be attached.
 * @param {Object} networkTiming - An object containing browser network timing metrics (e.g., requestStart, responseStart, responseEnd).
 * @param {number} baseTimestamp - The base timestamp (in ms or createInteractionAccessor, depending on context) to which timing offsets are added.
 * @returns {void}
 */
function recordBrowserNetworkMetrics(parentSpan, networkTiming, baseTimestamp) {
  // Ensure responseEnd timing is available before proceeding
  if (networkTiming.responseEnd) {
    // Record the 'request' phase as a child span
    FU._startChild(parentSpan, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "request",
      startTimestamp: baseTimestamp + parseTimingOffset(networkTiming.requestStart),
      endTimestamp: baseTimestamp + parseTimingOffset(networkTiming.responseEnd)
    });

    // Record the 'response' phase as a child span
    FU._startChild(parentSpan, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "response",
      startTimestamp: baseTimestamp + parseTimingOffset(networkTiming.responseStart),
      endTimestamp: baseTimestamp + parseTimingOffset(networkTiming.responseEnd)
    });
  }
}

module.exports = recordBrowserNetworkMetrics;