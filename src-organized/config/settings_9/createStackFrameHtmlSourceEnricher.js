/**
 * Creates a processor integration that enriches stack frames in events with HTML source context.
 *
 * @function createStackFrameHtmlSourceEnricher
 * @description
 *   Returns an integration object for enriching stack frames in error events with HTML source context.
 *   The number of context lines to include can be customized via the `frameContextLines` option.
 *
 * @param {Object} [options={}] - Configuration options for the enricher.
 * @param {number} [options.frameContextLines] - Number of context lines to include around each stack frame. Defaults to the global `gD9` value if not provided.
 * @returns {Object} Integration object with `name`, `setupOnce`, and `processEvent` methods.
 *   - `name` {string}: The integration name (from `PYA`).
 *   - `setupOnce` {Function}: No-op setup function.
 *   - `processEvent` {Function}: Processes an event, enriching stack frames with HTML source context.
 */
function createStackFrameHtmlSourceEnricher(options = {}) {
  // Determine the number of context lines to use for stack frame enrichment
  const frameContextLines = options.frameContextLines != null ? options.frameContextLines : gD9;

  return {
    /**
     * The integration name, provided externally.
     * @type {string}
     */
    name: PYA,

    /**
     * No-op setup function for integration lifecycle.
     */
    setupOnce() {},

    /**
     * Processes an event to enrich its stack frames with HTML source context.
     *
     * @param {Object} event - The event object to process.
     * @returns {Object} The processed event with enriched stack frames.
     */
    processEvent(event) {
      // Delegate to external function to perform the enrichment
      return enrichExceptionStackFramesWithHtmlContext(event, frameContextLines);
    }
  };
}

module.exports = createStackFrameHtmlSourceEnricher;