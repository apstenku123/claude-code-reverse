/**
 * Creates an event processor plugin that processes events with a configurable number of frame context lines.
 *
 * @param {Object} [options={}] - Configuration options for the plugin.
 * @param {number} [options.frameContextLines] - Number of context lines to include for each frame. If not provided, defaults to the value of dQ9.
 * @returns {Object} Plugin object with name, setupOnce, and processEvent methods.
 */
function createFrameContextEventProcessor(options = {}) {
  // Use the provided frameContextLines or fall back to the default value (dQ9)
  const frameContextLines = options.frameContextLines !== undefined ? options.frameContextLines : dQ9;

  return {
    name: sGA, // Plugin name, likely a constant imported from elsewhere
    setupOnce() {
      // No setup required for this plugin
    },
    /**
     * Processes an event by applying frame context lines configuration.
     * @param {Object} event - The event object to process.
     * @returns {Object} The processed event.
     */
    processEvent(event) {
      // Delegate event processing to preloadStacktraceFilenamesAndProcessFrames with the configured frameContextLines
      return preloadStacktraceFilenamesAndProcessFrames(event, frameContextLines);
    }
  };
}

module.exports = createFrameContextEventProcessor;