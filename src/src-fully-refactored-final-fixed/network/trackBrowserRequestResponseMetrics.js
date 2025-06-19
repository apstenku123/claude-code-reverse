/**
 * Tracks browser request and response timing metrics by creating child spans for each phase.
 *
 * @param {Object} parentSpan - The parent span or transaction to which child spans will be attached.
 * @param {Object} timingMetrics - An object containing browser timing metrics (e.g., requestStart, responseStart, responseEnd).
 * @param {number} baseTimestamp - The base timestamp (in ms or createInteractionAccessor, depending on context) to which timing offsets are added.
 * @returns {void}
 */
function trackBrowserRequestResponseMetrics(parentSpan, timingMetrics, baseTimestamp) {
  // Ensure that responseEnd timing is available before proceeding
  if (timingMetrics.responseEnd) {
    // Create a child span for the request phase
    FU._startChild(parentSpan, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "request",
      startTimestamp: baseTimestamp + convertMillisecondsToSeconds(timingMetrics.requestStart),
      endTimestamp: baseTimestamp + convertMillisecondsToSeconds(timingMetrics.responseEnd)
    });

    // Create a child span for the response phase
    FU._startChild(parentSpan, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "response",
      startTimestamp: baseTimestamp + convertMillisecondsToSeconds(timingMetrics.responseStart),
      endTimestamp: baseTimestamp + convertMillisecondsToSeconds(timingMetrics.responseEnd)
    });
  }
}

module.exports = trackBrowserRequestResponseMetrics;