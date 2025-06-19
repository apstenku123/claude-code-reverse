/**
 * @description
 * Factory function that creates an integration object for processing events. 
 * It attaches a transaction name to the event based on the first 'in_app' stack frame found.
 *
 * @returns {Object} Integration object with name, setupOnce, and processEvent methods.
 */
function createEventProcessorIntegration() {
  return {
    /**
     * The name of the integration, provided by the external constant zYA.
     */
    name: zYA,

    /**
     * Placeholder for integration setup logic. Currently does nothing.
     */
    setupOnce() {},

    /**
     * Processes an event object, searching its stack frames for the first 'in_app' frame.
     * If found, sets the event'createInteractionAccessor transaction property using the frame.
     *
     * @param {Object} event - The event object to process. Expected to have a stack trace.
     * @returns {Object} The processed event object, possibly with a new transaction property.
     */
    processEvent(event) {
      // Extract stack frames from the event using the external getStacktraceFramesFromEvent function
      const stackFrames = getStacktraceFramesFromEvent(event);

      // Iterate through stack frames in reverse order
      for (let frameIndex = stackFrames.length - 1; frameIndex >= 0; frameIndex--) {
        const frame = stackFrames[frameIndex];
        // Check if the frame is marked as 'in_app'
        if (frame.in_app === true) {
          // Set the event'createInteractionAccessor transaction property using the external getModuleFunctionDisplayName function
          event.transaction = getModuleFunctionDisplayName(frame);
          break; // Stop after the first 'in_app' frame is found
        }
      }
      return event;
    }
  };
}

module.exports = createEventProcessorIntegration;
