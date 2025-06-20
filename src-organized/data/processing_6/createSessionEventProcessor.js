/**
 * Creates a session event processor that tracks session start, end, and duration.
 *
 * @returns {Object} An object with `name`, `setupOnce`, and `processEvent` methods.
 *   - `name`: The processor name (from external constant CYA)
 *   - `setupOnce`: No-op setup function
 *   - `processEvent`: Function to process an event and add session timing metadata
 */
function createSessionEventProcessor() {
  // Record the session start time when the processor is created
  const sessionStartTimestamp = Date.now();

  return {
    // Name of the processor (assumed to be defined externally)
    name: CYA,

    // No-op setup function (placeholder for future setup logic)
    setupOnce() {},

    /**
     * Processes an event and adds session timing information to its `extra` property.
     *
     * @param {Object} event - The event object to process. Should have an `extra` property (object).
     * @returns {Object} a new event object with session timing metadata merged into `extra`.
     */
    processEvent(event) {
      // Capture the current time as the session end time
      const sessionEndTimestamp = Date.now();

      // Return a new event object with updated extra session metadata
      return {
        ...event,
        extra: {
          ...event.extra,
          // Add session start, duration, and end timestamps
          "session:start": sessionStartTimestamp,
          "session:duration": sessionEndTimestamp - sessionStartTimestamp,
          "session:end": sessionEndTimestamp
        }
      };
    }
  };
}

module.exports = createSessionEventProcessor;
