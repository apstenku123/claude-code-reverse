function createFailedRequestHandlerIntegration(options = {}) {
  // Merge default configuration with user-provided options
  const config = {
    failedRequestStatusCodes: [[500, 599]], // Default: treat 500-599 as failed
    failedRequestTargets: [/.*/],           // Default: match all targets
    ...options
  };

  return {
    name: 'UYA', // External integration name constant
    /**
     * @method setupOnce
     * @description No-op setup method for one-time initialization (required by interface).
     */
    setupOnce() {},

    /**
     * @method setup
     * @description Sets up the failed request handlers on the provided subscription/context.
     * @param {any} subscription - The subscription or context to attach handlers to.
     */
    setup(subscription) {
      // Attach failed request handlers using external utilities
      yD9(subscription, config);
      xD9(subscription, config);
    }
  };
}

module.exports = createFailedRequestHandlerIntegration;