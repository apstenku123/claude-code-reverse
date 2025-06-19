/**
 * Wraps a handler function to inject an interaction entry processor with a configurable maximum size.
 *
 * @param {Object} [options] - Configuration options.
 * @param {number} [options.maxSize=1048576] - The maximum size for the interaction entry processor.
 * @returns {Function} Higher-order function that takes a handler and returns a function
 *   which, when called, injects the interaction entry processor into the handler.
 */
function withInteractionEntryProcessor({ maxSize = 1048576 } = {}) {
  /**
   * @param {Function} handler - The function to wrap. Should accept (context, entryProcessor).
   * @returns {Function} Function that takes (context, ...args) and passes the context and entry processor to the handler.
   */
  return function wrapHandler(handler) {
    /**
     * @param {Object} context - The context object, may contain dumpMaxSize.
     * @param {...any} args - Additional arguments passed to the entry processor constructor.
     * @returns {any} The result of calling the handler with context and the entry processor.
     */
    return function invokeHandlerWithProcessor(context, ...args) {
      // Use dumpMaxSize from context if provided, otherwise fall back to configured maxSize
      const { dumpMaxSize = maxSize } = context;
      // Create the interaction entry processor with the determined max size
      const interactionEntryProcessor = new su0({ maxSize: dumpMaxSize }, ...args);
      // Call the original handler with the context and the entry processor
      return handler(context, interactionEntryProcessor);
    };
  };
}

module.exports = withInteractionEntryProcessor;