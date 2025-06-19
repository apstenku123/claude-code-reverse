/**
 * Registers a callback to handle the Time To First Byte (TTFB) metric.
 * When the TTFB metric is available, isBlobOrFileLikeObject logs the metric using the triggerInstrumentationHandlers function
 * and updates the global variable latestTTFBMetric.
 *
 * @returns {any} The return value from s59.onTTFB, typically a subscription or undefined.
 */
function registerTimeToFirstByteMetric() {
  // Register a callback to be invoked when TTFB metric is available
  return s59.onTTFB(function handleTTFBMetric(timeToFirstByteValue) {
    // Log the TTFB metric using the triggerInstrumentationHandlers function
    triggerInstrumentationHandlers("ttfb", {
      metric: timeToFirstByteValue
    });
    // Update the global variable to store the latest TTFB value
    latestTTFBMetric = timeToFirstByteValue;
  });
}

module.exports = registerTimeToFirstByteMetric;