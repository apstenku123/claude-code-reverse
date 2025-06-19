/**
 * @description
 * Provides an event processor plugin that inspects an event'createInteractionAccessor stack trace entries and, if any entry is marked as 'in_app',
 * sets the event'createInteractionAccessor transaction property based on that entry. This is typically used to improve transaction naming for error events.
 *
 * @returns {Object} Plugin object with name, setupOnce, and processEvent methods
 */
function inAppTransactionEventProcessor() {
  return {
    /**
     * Name of the plugin (external dependency)
     */
    name: zYA,

    /**
     * Setup hook (no-op in this implementation)
     */
    setupOnce() {},

    /**
     * Processes an event, updating its transaction name if an in-app stack frame is found.
     *
     * @param {Object} event - The event object to process. Expected to have a stack trace or similar structure.
     * @returns {Object} The processed event, possibly with an updated transaction property.
     */
    processEvent(event) {
      // Extract stack trace entries or similar from the event using external utility
      const stackEntries = getStacktraceFramesFromEvent(event);
      // Iterate backwards through stack entries to find the most relevant in-app frame
      for (let index = stackEntries.length - 1; index >= 0; index--) {
        const stackEntry = stackEntries[index];
        if (stackEntry.in_app === true) {
          // Set the transaction name based on the in-app stack frame using external utility
          event.transaction = getModuleFunctionDisplayName(stackEntry);
          break;
        }
      }
      return event;
    }
  };
}

module.exports = inAppTransactionEventProcessor;