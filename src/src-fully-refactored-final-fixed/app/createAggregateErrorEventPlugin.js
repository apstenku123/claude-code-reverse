/**
 * Creates a plugin object that preprocesses events by applying aggregate errors.
 *
 * @param {Object} [options={}] - Configuration options for the plugin.
 * @param {number} [options.limit=m09] - The maximum number of aggregate errors to process per event.
 * @param {string} [options.key=h09] - The key used to identify aggregate errors in the event.
 * @returns {Object} Plugin object with name, setupOnce, and preprocessEvent methods.
 */
function createAggregateErrorEventPlugin(options = {}) {
  // Use provided limit or fallback to default m09
  const aggregateErrorLimit = options.limit || m09;
  // Use provided key or fallback to default h09
  const aggregateErrorKey = options.key || h09;

  return {
    // Plugin name, assumed to be a constant imported elsewhere
    name: EQA,
    // Placeholder for setup logic if needed in the future
    setupOnce() {},
    /**
     * Preprocesses an event by applying aggregate errors.
     *
     * @param {Object} event - The event object to preprocess.
     * @param {Object} hint - Additional hint data for event processing.
     * @param {Object} client - The client object, expected to have getOptions().
     */
    preprocessEvent(event, hint, client) {
      // Retrieve client options (e.g., stackParser, maxValueLength)
      const clientOptions = client.getOptions();
      // Apply aggregate errors to the event using external utility
      zQA.applyAggregateErrorsToEvent(
        zQA.exceptionFromError, // Function to convert error to exception
        clientOptions.stackParser, // Stack trace parser
        clientOptions.maxValueLength, // Maximum value length for event data
        aggregateErrorKey, // Key for aggregate errors
        aggregateErrorLimit, // Limit for number of errors
        event, // The event object
        hint // Additional hint data
      );
    }
  };
}

module.exports = createAggregateErrorEventPlugin;