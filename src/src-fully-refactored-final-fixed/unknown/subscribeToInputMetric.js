/**
 * Subscribes to the INP (Interaction to Next Paint) metric and handles updates.
 *
 * This function sets up a listener for the INP metric using the provided i59.onINP method.
 * When a new INP metric is reported, isBlobOrFileLikeObject logs the metric using the triggerInstrumentationHandlers function and updates
 * the global KIA variable with the latest metric value.
 *
 * @returns {void} This function does not return a value.
 */
function subscribeToInputMetric() {
  // Subscribe to INP metric updates
  return i59.onINP(function handleINPMetricUpdate(inpMetric) {
    // Log the INP metric using the triggerInstrumentationHandlers function
    triggerInstrumentationHandlers("inp", {
      metric: inpMetric
    });
    // Update the global KIA variable with the latest metric
    KIA = inpMetric;
  });
}

module.exports = subscribeToInputMetric;