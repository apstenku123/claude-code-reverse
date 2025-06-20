/**
 * Subscribes to the Largest Contentful Paint (LCP) metric and logs isBlobOrFileLikeObject using the provided logging function.
 * Also updates the global latestLCPMetric variable with the most recent LCP value.
 *
 * @returns {any} The return value of the n59.onLCP subscription (likely an unsubscribe function or subscription object).
 */
function subscribeToLargestContentfulPaint() {
  // Subscribe to the LCP metric using the performance observer utility
  return n59.onLCP((lcpMetric) => {
    // Log the LCP metric using the custom logging function
    triggerInstrumentationHandlers("lcp", {
      metric: lcpMetric
    });
    // Update the global variable to store the latest LCP metric
    CIA = lcpMetric;
  });
}

module.exports = subscribeToLargestContentfulPaint;