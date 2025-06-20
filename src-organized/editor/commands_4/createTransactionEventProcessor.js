/**
 * Creates an event processor plugin that attaches transaction information to events.
 *
 * @returns {Object} Plugin object with name, setupOnce, and processEvent methods
 * @property {string} name - The plugin name
 * @property {Function} setupOnce - No-op setup function
 * @property {Function} processEvent - Processes an event and attaches transaction info if found
 */
function createTransactionEventProcessor() {
  return {
    /**
     * The name of this plugin, imported from external dependency zYA.
     */
    name: zYA,

    /**
     * No-op setup function required by the plugin interface.
     */
    setupOnce() {},

    /**
     * Processes an event object, searching for the first 'in_app' stack frame (from the end)
     * and attaches a transaction name to the event if found.
     *
     * @param {Object} event - The event object to process
     * @returns {Object} The processed event object, possibly with a transaction property
     */
    processEvent(event) {
      // Extract stack frames or relevant entries from the event using getStacktraceFramesFromEvent
      const stackFrames = getStacktraceFramesFromEvent(event);
      // Iterate backwards through the stack frames to find the most recent 'in_app' frame
      for (let frameIndex = stackFrames.length - 1; frameIndex >= 0; frameIndex--) {
        const stackFrame = stackFrames[frameIndex];
        if (stackFrame.in_app === true) {
          // If an in_app frame is found, generate a transaction name using getModuleFunctionDisplayName
          event.transaction = getModuleFunctionDisplayName(stackFrame);
          break; // Stop after the first match
        }
      }
      return event;
    }
  };
}

module.exports = createTransactionEventProcessor;