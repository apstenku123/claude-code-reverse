/**
 * @function createHtmlContextStackFrameEnricher
 * @description
 * Factory function that creates a processor for enriching exception stack frames in event objects
 * with contextual HTML lines from the current document. This aids debugging by providing DOM context for errors.
 *
 * @param {Object} [options={}] - Configuration options for the enricher.
 * @param {number} [options.frameContextLines] - Number of HTML context lines to include around each stack frame. Defaults to global value `gD9` if not provided.
 * @returns {Object} Processor plugin with `name`, `setupOnce`, and `processEvent` methods.
 */
function createHtmlContextStackFrameEnricher(options = {}) {
  // Use the provided frameContextLines or fall back to the default global value
  const frameContextLines = options.frameContextLines != null ? options.frameContextLines : gD9;

  return {
    // Plugin name, provided by external constant
    name: PYA,
    // No-op setup method (required by plugin interface)
    setupOnce() {},
    /**
     * Enriches the event'createInteractionAccessor exception stack frames with HTML context.
     * @param {Object} event - The event object to process.
     * @returns {Object} The enriched event object.
     */
    processEvent(event) {
      // Delegate to the enrichment function with the configured context lines
      return enrichExceptionStackFramesWithHtmlContext(event, frameContextLines);
    }
  };
}

module.exports = createHtmlContextStackFrameEnricher;