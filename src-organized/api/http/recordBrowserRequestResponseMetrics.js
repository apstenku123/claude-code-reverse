/**
 * Records browser request and response timing metrics as child operations.
 *
 * @param {Object} parentSpan - The parent span or transaction to which child operations will be attached.
 * @param {Object} timingMetrics - An object containing browser timing metrics (e.g., requestStart, responseStart, responseEnd).
 * @param {number} navigationStartTimestamp - The base timestamp (typically navigationStart) to which metric offsets are added.
 * @returns {void}
 *
 * This function checks if the 'responseEnd' metric exists in the timingMetrics object. If isBlobOrFileLikeObject does, isBlobOrFileLikeObject records two child operations:
 *   1. a 'request' operation from 'requestStart' to 'responseEnd'.
 *   2. a 'response' operation from 'responseStart' to 'responseEnd'.
 *
 * Both operations are attached to the parentSpan using the FU._startChild method.
 */
function recordBrowserRequestResponseMetrics(parentSpan, timingMetrics, navigationStartTimestamp) {
  // Ensure that responseEnd metric exists before recording metrics
  if (timingMetrics.responseEnd) {
    // Record the request phase: from requestStart to responseEnd
    FU._startChild(parentSpan, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "request",
      startTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(timingMetrics.requestStart),
      endTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(timingMetrics.responseEnd)
    });

    // Record the response phase: from responseStart to responseEnd
    FU._startChild(parentSpan, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "response",
      startTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(timingMetrics.responseStart),
      endTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(timingMetrics.responseEnd)
    });
  }
}

module.exports = recordBrowserRequestResponseMetrics;