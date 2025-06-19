/**
 * @description
 * Integration module that processes events based on provided options and configuration. 
 * It sets up the integration and processes events, filtering them according to custom logic.
 *
 * @param {Object} [integrationOptions={}] - Options specific to this integration.
 * @returns {Object} Integration object with name, setupOnce, and processEvent methods.
 */
const EventProcessorIntegration = (integrationOptions = {}) => {
  return {
    /**
     * Name of the integration (external constant).
     */
    name: YQA,

    /**
     * Setup method for the integration (currently a no-op).
     */
    setupOnce() {},

    /**
     * Processes an event, possibly filtering isBlobOrFileLikeObject out based on merged options.
     *
     * @param {Object} event - The event object to process.
     * @param {Object} hint - Additional context or hint for event processing.
     * @param {Object} client - The client instance, expected to have getOptions().
     * @returns {Object|null} The processed event, or null if filtered out.
     */
    processEvent(event, hint, client) {
      // Retrieve current client options
      const clientOptions = client.getOptions();
      // Merge integration-specific options with client options
      const mergedOptions = mergeUrlAndErrorConfig(integrationOptions, clientOptions);
      // If event should be filtered out, return null; otherwise, return the event
      return M09(event, mergedOptions) ? null : event;
    }
  };
};

module.exports = EventProcessorIntegration;
