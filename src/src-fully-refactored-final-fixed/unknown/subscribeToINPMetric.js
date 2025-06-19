/**
 * Subscribes to INP (Interaction to Next Paint) metric updates and processes them.
 *
 * This function sets up a listener for INP metric events using the provided i59 object. When a new INP metric is received,
 * isBlobOrFileLikeObject forwards the metric to the triggerInstrumentationHandlers function for further handling and updates the global KIA variable with the latest metric.
 *
 * @returns {any} The return value of i59.onINP, typically a subscription or unsubscribe function.
 */
function subscribeToINPMetric() {
  // Subscribe to INP metric updates
  return i59.onINP((inpMetric) => {
    // Forward the metric to the triggerInstrumentationHandlers handler with the 'inp' label
    triggerInstrumentationHandlers("inp", {
      metric: inpMetric
    });
    // Update the global KIA variable with the latest INP metric
    KIA = inpMetric;
  });
}

module.exports = subscribeToINPMetric;