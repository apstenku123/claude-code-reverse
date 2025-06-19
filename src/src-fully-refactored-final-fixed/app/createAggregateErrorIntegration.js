/**
 * Creates an integration for applying aggregate errors to events.
 *
 * This function returns an integration object with a name, a no-op setupOnce method, and a preprocessEvent method.
 * The preprocessEvent method applies aggregate errors to the given event using the provided options and configuration.
 *
 * @param {Object} [options={}] - Optional configuration for the integration.
 * @param {number} [options.limit] - Maximum number of aggregate errors to process. Defaults to m09 if not provided.
 * @param {string} [options.key] - The key under which to store aggregate errors. Defaults to h09 if not provided.
 * @returns {Object} Integration object with name, setupOnce, and preprocessEvent methods.
 */
const createAggregateErrorIntegration = (options = {}) => {
  // Use provided limit or fallback to default m09
  const maxAggregateErrors = options.limit || m09;
  // Use provided key or fallback to default h09
  const aggregateErrorKey = options.key || h09;

  return {
    name: EQA, // Integration name (external constant)
    setupOnce() {
      // No setup required for this integration
    },
    /**
     * Preprocesses an event by applying aggregate errors.
     *
     * @param {Object} event - The event to preprocess.
     * @param {Object} hint - Additional hint/context for the event.
     * @param {Object} client - The client instance, used to get options.
     */
    preprocessEvent(event, hint, client) {
      // Retrieve client options (e.g., stackParser, maxValueLength)
      const clientOptions = client.getOptions();
      // Apply aggregate errors to the event using external utility
      zQA.applyAggregateErrorsToEvent(
        zQA.exceptionFromError, // Function to extract exception from error
        clientOptions.stackParser, // Stack trace parser
        clientOptions.maxValueLength, // Maximum value length
        aggregateErrorKey, // Key for aggregate errors
        maxAggregateErrors, // Limit for aggregate errors
        event, // The event object
        hint // Additional hint/context
      );
    }
  };
};

module.exports = createAggregateErrorIntegration;
