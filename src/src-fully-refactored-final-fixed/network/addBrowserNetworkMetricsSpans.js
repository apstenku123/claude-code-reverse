/**
 * Adds browser network metric spans (request and response) as child operations to the given transaction.
 *
 * @param {Object} transaction - The transaction object to which child spans will be added.
 * @param {Object} browserTiming - The browser timing object containing navigation timing metrics.
 * @param {number} navigationStartTimestamp - The timestamp (in ms) representing navigation start, used as a base for relative timings.
 * @returns {void}
 *
 * This function checks if the browser timing object has a responseEnd property. If so, isBlobOrFileLikeObject creates two child spans:
 *   1. a 'request' span from requestStart to responseEnd.
 *   2. a 'response' span from responseStart to responseEnd.
 *
 * The spans are added using FU._startChild, and the timing values are adjusted using the convertMillisecondsToSeconds function.
 */
function addBrowserNetworkMetricsSpans(transaction, browserTiming, navigationStartTimestamp) {
  // Ensure responseEnd exists before adding spans
  if (browserTiming.responseEnd) {
    // Add a span for the entire request phase
    FU._startChild(transaction, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "request",
      startTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(browserTiming.requestStart),
      endTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(browserTiming.responseEnd)
    });

    // Add a span for the response phase
    FU._startChild(transaction, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "response",
      startTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(browserTiming.responseStart),
      endTimestamp: navigationStartTimestamp + convertMillisecondsToSeconds(browserTiming.responseEnd)
    });
  }
}

module.exports = addBrowserNetworkMetricsSpans;