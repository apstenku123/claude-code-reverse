/**
 * @description
 * Creates an integration object for processing events and extracting transaction information.
 * This integration inspects the event'createInteractionAccessor stack trace entries (frames) to find the first 'in_app' frame,
 * and sets the event'createInteractionAccessor transaction name based on that frame using a provided utility.
 *
 * @returns {Object} Integration object with name, setupOnce, and processEvent methods.
 */
function createTransactionProcessorIntegration() {
  return {
    /**
     * The name of this integration, provided by an external constant.
     * @type {string}
     */
    name: zYA,

    /**
     * Placeholder for setup logic. No setup required for this integration.
     */
    setupOnce() {},

    /**
     * Processes an event to set its transaction name based on the first in-app stack frame.
     *
     * @param {Object} event - The event object to process. Expected to have a stack trace.
     * @returns {Object} The processed event, possibly with a transaction name set.
     */
    processEvent(event) {
      // Extract stack trace frames from the event using the external utility
      const stackFrames = getStacktraceFramesFromEvent(event);
      // Iterate backwards through the stack frames to find the first in-app frame
      for (let frameIndex = stackFrames.length - 1; frameIndex >= 0; frameIndex--) {
        const frame = stackFrames[frameIndex];
        if (frame.in_app === true) {
          // Set the transaction name on the event using the external utility
          event.transaction = getModuleFunctionDisplayName(frame);
          break; // Stop after the first in-app frame is found
        }
      }
      return event;
    }
  };
}

module.exports = createTransactionProcessorIntegration;