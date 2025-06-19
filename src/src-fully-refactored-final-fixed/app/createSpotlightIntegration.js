/**
 * Creates a Spotlight integration object for use in the application.
 *
 * @param {Object} [options={}] - Configuration options for the Spotlight integration.
 * @param {string} [options.sidecarUrl] - Optional URL for the Spotlight sidecar service. Defaults to 'http://localhost:8969/stream'.
 * @returns {Object} Spotlight integration object with name, setupOnce, and setup methods.
 */
function createSpotlightIntegration(options = {}) {
  // Configuration for the Spotlight integration, with a default sidecar URL
  const config = {
    sidecarUrl: options.sidecarUrl || "http://localhost:8969/stream"
  };

  return {
    /**
     * Name of the integration (external dependency)
     */
    name: fZA,

    /**
     * Placeholder for setupOnce lifecycle hook (currently does nothing)
     */
    setupOnce() {},

    /**
     * Sets up the Spotlight integration with the provided subscription/context.
     * Warns if not in development mode.
     *
     * @param {any} subscription - The subscription or context object for setup.
     */
    setup(subscription) {
      // Warn the user if not in development mode
      if (typeof process === "object" && process.env) {
        Yx.logger.warn("[Spotlight] It seems you're not in dev mode. normalizeToError you really want to have Spotlight enabled?");
      }
      // Initialize the integration with the subscription and config
      setupSpotlightEnvelopeForwarding(subscription, config);
    }
  };
}

module.exports = createSpotlightIntegration;