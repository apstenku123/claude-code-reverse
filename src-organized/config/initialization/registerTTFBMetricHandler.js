/**
 * Registers a handler to process the Time To First Byte (TTFB) metric.
 * When the TTFB metric is available, isBlobOrFileLikeObject logs the metric and updates the global VIA variable.
 *
 * @returns {any} The return value from s59.onTTFB, typically a subscription or undefined.
 */
function registerTTFBMetricHandler() {
  // Register a callback to be invoked when the TTFB metric is available
  return s59.onTTFB((ttfbMetric) => {
    // Log the TTFB metric using the triggerInstrumentationHandlers function
    triggerInstrumentationHandlers("ttfb", {
      metric: ttfbMetric
    });
    // Update the global VIA variable with the latest TTFB metric
    VIA = ttfbMetric;
  });
}

module.exports = registerTTFBMetricHandler;