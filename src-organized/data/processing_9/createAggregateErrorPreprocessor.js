/**
 * Creates an event preprocessor that applies aggregate errors to events using provided configuration.
 *
 * @param {Object} [options={}] - Configuration options for the preprocessor.
 * @param {number} [options.limit=m09] - Maximum number of errors to aggregate. Defaults to m09 if not provided.
 * @param {string} [options.key=h09] - Key used for error aggregation. Defaults to h09 if not provided.
 * @returns {Object} An object with name, setupOnce, and preprocessEvent methods for event processing.
 */
const createAggregateErrorPreprocessor = (options = {}) => {
  // Use provided limit or fallback to default m09
  const maxAggregateErrors = options.limit || m09;
  // Use provided key or fallback to default h09
  const aggregateErrorKey = options.key || h09;

  return {
    name: EQA, // Presumed constant representing the preprocessor'createInteractionAccessor name

    // Placeholder for setup logic if needed in the future
    setupOnce() {},

    /**
     * Preprocesses an event by applying aggregate errors.
     *
     * @param {Object} event - The event object to preprocess.
     * @param {Object} hint - Additional hint/context for the event.
     * @param {Object} client - The client instance, expected to have getOptions().
     */
    preprocessEvent(event, hint, client) {
      // Retrieve options from the client
      const clientOptions = client.getOptions();
      // Apply aggregate errors to the event using the zQA utility
      zQA.applyAggregateErrorsToEvent(
        zQA.exceptionFromError, // Function to extract exception from error
        clientOptions.stackParser, // Stack parser from client options
        clientOptions.maxValueLength, // Max value length from client options
        aggregateErrorKey, // Key for aggregation
        maxAggregateErrors, // Limit for aggregation
        event, // The event to process
        hint // Additional hint/context
      );
    }
  };
};

module.exports = createAggregateErrorPreprocessor;
