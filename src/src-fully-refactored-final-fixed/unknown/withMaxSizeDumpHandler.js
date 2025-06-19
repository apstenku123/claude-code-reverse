/**
 * Wraps a handler function to inject a dump handler with a configurable maximum size.
 *
 * @param {Object} [options] - Configuration options.
 * @param {number} [options.maxSize=1048576] - The default maximum size for the dump handler.
 * @returns {Function} Higher-order function that takes a handler and returns a new handler with dump handler injection.
 */
function withMaxSizeDumpHandler({ maxSize = 1048576 } = {}) {
  /**
   * @param {Function} handler - The handler function to be wrapped. Should accept (context, dumpHandler).
   * @returns {Function} Wrapped handler function.
   */
  return function wrapHandler(handler) {
    /**
     * @param {Object} context - The context object, may contain 'dumpMaxSize'.
     * @param {any} extraArgs - Additional arguments passed to the dump handler constructor.
     * @returns {any} The result of invoking the original handler with context and dump handler.
     */
    return function wrappedHandler(context, extraArgs) {
      // Use dumpMaxSize from context if provided, otherwise fall back to default maxSize
      const { dumpMaxSize = maxSize } = context;
      // Create a new dump handler instance with the resolved max size
      const dumpHandler = new su0({ maxSize: dumpMaxSize }, extraArgs);
      // Call the original handler with the context and the dump handler
      return handler(context, dumpHandler);
    };
  };
}

module.exports = withMaxSizeDumpHandler;