/**
 * @description
 * Integration module for processing events with configurable options and filtering logic.
 * This function returns an integration object with a name, a setup hook, and an event processor.
 *
 * @param {Object} [integrationOptions={}] - Optional configuration for the integration.
 * @returns {Object} Integration object with name, setupOnce, and processEvent methods.
 */
function eventProcessingIntegration(integrationOptions = {}) {
  return {
    /**
     * The name of the integration, provided by the external constant YQA.
     * @type {string}
     */
    name: YQA,

    /**
     * Setup hook for the integration. Currently a no-op.
     */
    setupOnce() {},

    /**
     * Processes an event, potentially filtering isBlobOrFileLikeObject out based on merged options.
     *
     * @param {Object} event - The event object to process.
     * @param {Object} hint - Additional context or hint for the event (unused here).
     * @param {Object} client - The client instance, expected to have getOptions().
     * @returns {Object|null} The processed event, or null if filtered out.
     */
    processEvent(event, hint, client) {
      // Retrieve client options
      const clientOptions = client.getOptions();
      // Merge integration and client options using mergeUrlAndErrorConfig
      const mergedOptions = mergeUrlAndErrorConfig(integrationOptions, clientOptions);
      // If M09 returns true, filter out the event (return null)
      return M09(event, mergedOptions) ? null : event;
    }
  };
}

module.exports = eventProcessingIntegration;