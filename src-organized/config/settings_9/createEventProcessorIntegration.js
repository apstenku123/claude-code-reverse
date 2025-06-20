/**
 * @file createEventProcessorIntegration.js
 * @module app
 *
 * @description
 * Creates an integration object for processing events with configurable frame context lines.
 * The integration exposes a name, a setupOnce method (no-op), and a processEvent method
 * that delegates to the preloadStacktraceFilenamesAndProcessFrames function with the provided event and frame context lines.
 *
 * @param {Object} [options={}] - Configuration options for the integration.
 * @param {number} [options.frameContextLines] - Number of context lines to include for each frame. Defaults to dQ9 if not provided.
 * @returns {Object} Integration object with name, setupOnce, and processEvent methods.
 */
function createEventProcessorIntegration(options = {}) {
  // Use the provided frameContextLines or fall back to the default value (dQ9)
  const frameContextLines = options.frameContextLines !== undefined ? options.frameContextLines : dQ9;

  return {
    /**
     * The name of the integration (from sGA external constant)
     * @type {string}
     */
    name: sGA,

    /**
     * No-op setup method required by the integration interface.
     */
    setupOnce() {},

    /**
     * Processes an event using the preloadStacktraceFilenamesAndProcessFrames function with the configured frame context lines.
     * @param {Object} event - The event object to process.
     * @returns {any} The result of processing the event.
     */
    processEvent(event) {
      // Delegate event processing to preloadStacktraceFilenamesAndProcessFrames with the configured context lines
      return preloadStacktraceFilenamesAndProcessFrames(event, frameContextLines);
    }
  };
}

module.exports = createEventProcessorIntegration;