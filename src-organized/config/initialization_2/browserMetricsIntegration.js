/**
 * Integrates browser metrics aggregation into the provided monitoring framework.
 *
 * This integration sets up a BrowserMetricsAggregator instance on the provided monitoring context,
 * allowing for the collection and aggregation of browser metrics. It exposes a setup method to initialize
 * the aggregator and a setupOnce method for potential one-time setup logic (currently a no-op).
 *
 * @returns {Object} Integration object with name, setupOnce, and setup methods
 */
const browserMetricsIntegration = () => {
  return {
    /**
     * The name of this integration, as defined by the external constant PQA.
     */
    name: PQA,

    /**
     * Optional one-time setup logic for the integration.
     * Currently a no-op, but can be extended in the future.
     */
    setupOnce() {
      // No one-time setup required at this time
    },

    /**
     * Sets up the browser metrics aggregator on the provided monitoring context.
     *
     * @param {Object} monitoringContext - The context object for the monitoring framework.
     */
    setup(monitoringContext) {
      // Attach a new BrowserMetricsAggregator instance to the monitoring context
      monitoringContext.metricsAggregator = new B29.BrowserMetricsAggregator(monitoringContext);
    }
  };
};

module.exports = browserMetricsIntegration;
