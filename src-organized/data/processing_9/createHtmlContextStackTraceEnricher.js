/**
 * Creates a processor that enriches exception stack traces with HTML source context.
 *
 * @param {Object} [options={}] - Configuration options for the enricher.
 * @param {number} [options.frameContextLines] - Number of context lines to include for each stack frame. Defaults to gD9 if not provided.
 * @returns {Object} Processor with name, setupOnce, and processEvent methods.
 */
function createHtmlContextStackTraceEnricher(options = {}) {
  // Use the provided frameContextLines or fall back to the default (gD9)
  const frameContextLines = options.frameContextLines != null ? options.frameContextLines : gD9;

  return {
    /**
     * Name of the processor (external constant PYA)
     */
    name: PYA,

    /**
     * No-op setup function (required by interface)
     */
    setupOnce() {},

    /**
     * Processes an event by enriching its exception stack traces with HTML context.
     *
     * @param {Object} event - The event object to process.
     * @returns {Object} The processed/enriched event.
     */
    processEvent(event) {
      // Delegate to enrichExceptionStackTracesWithHtmlContext (enrichExceptionStackFramesWithHtmlContext)
      return enrichExceptionStackTracesWithHtmlContext(event, frameContextLines);
    }
  };
}

module.exports = createHtmlContextStackTraceEnricher;