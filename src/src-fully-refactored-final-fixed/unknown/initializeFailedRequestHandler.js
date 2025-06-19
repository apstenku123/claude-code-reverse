function initializeFailedRequestHandler(customConfig = {}) {
  // Merge default configuration with any custom overrides
  const config = {
    failedRequestStatusCodes: [[500, 599]],
    failedRequestTargets: [/.*/],
    ...customConfig
  };

  return {
    // Handler name, likely used for identification in a registry
    name: "UYA",

    /**
     * Lifecycle hook for one-time setup (currently a no-op).
     */
    setupOnce() {},

    /**
     * Sets up failed request monitoring for the provided subscription/context.
     *
     * @param {Object} subscription - The context or subscription to attach monitoring to.
     */
    setup(subscription) {
      // Attach failed request monitoring logic using external dependencies
      yD9(subscription, config);
      xD9(subscription, config);
    }
  };
}

module.exports = initializeFailedRequestHandler;