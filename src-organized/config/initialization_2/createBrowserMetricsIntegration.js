/**
 * @description
 * Creates a browser metrics integration object for use with a monitoring or analytics system.
 * This integration sets up a metrics aggregator on the provided client instance, enabling the collection
 * and aggregation of browser metrics. The integration exposes a name, a setupOnce method (currently a no-op),
 * and a setup method that attaches the aggregator to the client.
 *
 * @returns {object} An integration object with name, setupOnce, and setup methods.
 */
const createBrowserMetricsIntegration = () => {
  return {
    /**
     * The name of the integration, imported from PQA.
     */
    name: PQA,

    /**
     * Called once to set up global integration hooks. Currently a no-op.
     */
    setupOnce() {
      // No global setup required at this time.
    },

    /**
     * Sets up the metrics aggregator on the provided client instance.
     *
     * @param {object} clientInstance - The client instance to attach the metrics aggregator to.
     */
    setup(clientInstance) {
      // Attach a new BrowserMetricsAggregator to the client instance for collecting browser metrics.
      clientInstance.metricsAggregator = new B29.BrowserMetricsAggregator(clientInstance);
    }
  };
};

module.exports = createBrowserMetricsIntegration;
