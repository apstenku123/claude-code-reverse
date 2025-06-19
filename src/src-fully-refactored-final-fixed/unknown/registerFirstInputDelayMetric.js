/**
 * Registers a callback to handle the First Input Delay (FID) metric.
 * When the FID metric is reported, this function logs the metric and updates the global FID value.
 *
 * @returns {void} This function does not return a value.
 */
function registerFirstInputDelayMetric() {
  // Listen for the First Input Delay (FID) metric using l59'createInteractionAccessor onFID method
  return l59.onFID(function(firstInputDelayMetric) {
    // Log the FID metric using the triggerInstrumentationHandlers function
    triggerInstrumentationHandlers("fid", {
      metric: firstInputDelayMetric
    });
    // Update the global FID value
    XIA = firstInputDelayMetric;
  });
}

module.exports = registerFirstInputDelayMetric;