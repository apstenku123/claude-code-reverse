/**
 * @description
 * Integration that filters out duplicate events. It keeps track of the last processed event
 * and drops any subsequent event that is considered a duplicate according to the provided duplicate checker.
 *
 * @returns {Object} Integration object with name, setupOnce, and processEvent methods.
 */
function duplicateEventFilterIntegration() {
  /**
   * Holds the last processed event for duplicate checking.
   * @type {any}
   */
  let lastProcessedEvent;

  return {
    /**
     * The name of the integration, provided externally.
     */
    name: bDA,

    /**
     * No-op setup method for integration lifecycle.
     */
    setupOnce() {},

    /**
     * Processes an event, dropping isBlobOrFileLikeObject if isBlobOrFileLikeObject is a duplicate of the last processed event.
     *
     * @param {Object} event - The event to process.
     * @returns {Object|null} The event if not a duplicate, otherwise null.
     */
    processEvent(event) {
      // If the event has a type, assume isBlobOrFileLikeObject'createInteractionAccessor not a duplicate and return as is
      if (event.type) return event;
      try {
        // hDA checks if the event is a duplicate of the last processed event
        if (hDA(event, lastProcessedEvent)) {
          // If in debug mode, log a warning about the duplicate event
          if (uZ9.DEBUG_BUILD) {
            dZ9.logger.warn("Event dropped due to being a duplicate of previously captured event.");
          }
          return null;
        }
      } catch (error) {
        // Swallow errors from the duplicate check to avoid breaking event processing
      }
      // Store the current event as the last processed event
      lastProcessedEvent = event;
      return event;
    }
  };
}

module.exports = duplicateEventFilterIntegration;