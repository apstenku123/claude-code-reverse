function createFailedRequestIntegration(options = {}) {
  // Merge default configuration with any provided overrides
  const config = {
    failedRequestStatusCodes: [[500, 599]],
    failedRequestTargets: [/.*/],
    ...options
  };

  return {
    // Integration name, likely a constant imported from elsewhere
    name: 'UYA',
    // Placeholder for setupOnce lifecycle method (no-op)
    setupOnce() {},
    /**
     * Sets up the integration by registering failed request handlers.
     * @param {Object} subscription - The subscription or client object to attach handlers to.
     */
    setup(subscription) {
      // Register handler for failed requests (implementation external)
      yD9(subscription, config);
      xD9(subscription, config);
    }
  };
}

module.exports = createFailedRequestIntegration;