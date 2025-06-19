/**
 * @module StackFrameMetadataIntegration
 *
 * @description
 * Integration for processing stack frame metadata within event envelopes. This integration hooks into the event processing pipeline,
 * strips metadata from stack frames before sending envelopes, and adds metadata back to stack frames when processing events.
 *
 * @returns {Object} Integration object with name, setup, and processEvent methods.
 */
const StackFrameMetadataIntegration = () => {
  return {
    /**
     * Name of the integration (from external constant r3A).
     * @type {string}
     */
    name: r3A,

    /**
     * No-op setupOnce method (required by integration interface).
     */
    setupOnce() {},

    /**
     * Sets up the integration by attaching a handler to the 'beforeEnvelope' event.
     *
     * @param {Object} eventEmitter - The event emitter or transport object that emits 'beforeEnvelope' events.
     */
    setup(eventEmitter) {
      // Ensure the eventEmitter has an 'on' method
      if (typeof eventEmitter.on !== "function") return;

      // Listen for the 'beforeEnvelope' event to process envelope items
      eventEmitter.on("beforeEnvelope", (envelope) => {
        // Iterate over each item in the envelope
        D09.forEachEnvelopeItem(envelope, (envelopeItem, envelopeItemType) => {
          // Only process items of type 'event'
          if (envelopeItemType === "event") {
            // The event payload is typically at index 1 if the envelope item is an array
            const eventPayload = Array.isArray(envelopeItem) ? envelopeItem[1] : undefined;
            if (eventPayload) {
              // Strip metadata from stack frames before sending
              a3A.stripMetadataFromStackFrames(eventPayload);
              // Update the envelope item with the stripped event payload
              envelopeItem[1] = eventPayload;
            }
          }
        });
      });
    },

    /**
     * Processes an event by adding metadata to its stack frames.
     *
     * @param {Object} event - The event object to process.
     * @param {Object} hint - Additional hint/context for processing (unused).
     * @param {Object} client - The client object, used to access options and stack parser.
     * @returns {Object} The processed event with metadata added to its stack frames.
     */
    processEvent(event, hint, client) {
      // Retrieve the stack parser from client options
      const stackParser = client.getOptions().stackParser;
      // Add metadata to stack frames in the event
      a3A.addMetadataToStackFrames(stackParser, event);
      return event;
    }
  };
};

module.exports = StackFrameMetadataIntegration;
