/**
 * Adds browser request and response timing metrics as child operations to the given source observable.
 *
 * @param {Object} sourceObservable - The parent observable or transaction to which child metrics will be attached.
 * @param {Object} browserTimingMetrics - An object containing browser timing metrics (e.g., requestStart, responseStart, responseEnd).
 * @param {number} navigationStartTimestamp - The base timestamp (typically navigationStart) to offset browser metrics.
 * @returns {void}
 */
function addBrowserRequestResponseMetrics(sourceObservable, browserTimingMetrics, navigationStartTimestamp) {
  // Only proceed if responseEnd metric is available
  if (browserTimingMetrics.responseEnd) {
    // Add a child span for the request phase
    FU._startChild(sourceObservable, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "request",
      startTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(browserTimingMetrics.requestStart),
      endTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(browserTimingMetrics.responseEnd)
    });

    // Add a child span for the response phase
    FU._startChild(sourceObservable, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "response",
      startTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(browserTimingMetrics.responseStart),
      endTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(browserTimingMetrics.responseEnd)
    });
  }
}

module.exports = addBrowserRequestResponseMetrics;