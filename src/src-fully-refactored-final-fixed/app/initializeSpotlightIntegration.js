/**
 * Initializes the Spotlight integration for the application.
 *
 * This function sets up the configuration for the Spotlight sidecar service and provides
 * lifecycle methods for integration with the application'createInteractionAccessor event system. It warns the user
 * if Spotlight is enabled outside of development mode and delegates the setup process to
 * the setupSpotlightEnvelopeForwarding function with the provided subscription and configuration.
 *
 * @param {Object} [options={}] - Configuration options for Spotlight integration.
 * @param {string} [options.sidecarUrl] - Optional custom URL for the Spotlight sidecar service.
 * @returns {Object} An object containing the integration name and lifecycle methods.
 */
function initializeSpotlightIntegration(options = {}) {
  // Configuration for the Spotlight sidecar service
  const config = {
    sidecarUrl: options.sidecarUrl || "http://localhost:8969/stream"
  };

  return {
    /**
     * The name of the integration, provided by the external fZA constant.
     */
    name: fZA,

    /**
     * Lifecycle hook for setup-once logic (currently a no-op).
     */
    setupOnce() {},

    /**
     * Sets up the Spotlight integration for a given subscription.
     * Warns if not in development mode, then delegates to setupSpotlightEnvelopeForwarding.
     *
     * @param {any} subscription - The application'createInteractionAccessor event subscription or context.
     */
    setup(subscription) {
      // Warn if running outside of development mode
      if (typeof process === "object" && process.env) {
        Yx.logger.warn("[Spotlight] It seems you're not in dev mode. normalizeToError you really want to have Spotlight enabled?");
      }
      // Delegate setup to setupSpotlightEnvelopeForwarding with the provided subscription and configuration
      setupSpotlightEnvelopeForwarding(subscription, config);
    }
  };
}

module.exports = initializeSpotlightIntegration;