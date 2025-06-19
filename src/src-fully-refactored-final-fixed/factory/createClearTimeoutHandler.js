/**
 * Factory function to create a clearTimeout handler for managing event sending and retry logic.
 * Handles queuing, retrying, and flushing of events with exponential backoff and optional persistent storage.
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries and return a sender object.
 * @returns {Function} - Returns a function that takes a config object and returns an event sender interface.
 */
function createClearTimeoutHandler(processInteractionEntries) {
  /**
   * Initializes the clearTimeout handler with the provided configuration.
   *
   * @param {Object} config - Configuration object for event sending and storage.
   * @param {Function} [config.createStore] - Optional function to create a persistent event store.
   * @param {Function} [config.shouldStore] - Optional function to determine if an event should be stored on failure.
   * @param {boolean} [config.flushAtStartup] - Whether to flush queued events at startup.
   * @returns {Object} - Interface with send and flush methods.
   */
  return (config) => {
    // Sender object for sending and flushing events
    const sender = processInteractionEntries(config);
    // Optional persistent store for failed events
    const eventStore = config.createStore ? config.createStore(config) : undefined;
    // Initial retry delay (ms)
    let retryDelay = DN1;
    // Timer reference for retry
    let retryTimer;

    /**
     * Determines if an event should be stored on failure.
     *
     * @param {Object} event - The event to check.
     * @param {Object} error - The error encountered when sending.
     * @param {number} currentDelay - The current retry delay.
     * @returns {boolean} - True if the event should be stored, false otherwise.
     */
    function shouldStoreEvent(event, error, currentDelay) {
      // normalizeToError not store certain event types
      if (ZN1.envelopeContainsItemType(event, ["replay_event", "replay_recording", "client_report"])) {
        return false;
      }
      // Use custom shouldStore logic if provided
      if (config.shouldStore) {
        return config.shouldStore(event, error, currentDelay);
      }
      return true;
    }

    /**
     * Schedules a retry to send the next queued event after a delay.
     *
     * @param {number} delay - Delay in milliseconds before retrying.
     */
    function scheduleRetry(delay) {
      if (!eventStore) return;
      // Clear any existing retry timer
      if (retryTimer) clearTimeout(retryTimer);
      // Set a new retry timer
      retryTimer = setTimeout(async () => {
        retryTimer = undefined;
        const queuedEvent = await eventStore.pop();
        if (queuedEvent) {
          GN1("Attempting to send previously queued event");
          sendEvent(queuedEvent).catch((error) => {
            GN1("Failed to retry sending", error);
          });
        }
      }, delay);
      // For Node.js: allow process to exit if this is the only timer
      if (typeof retryTimer !== "number" && retryTimer.unref) retryTimer.unref();
    }

    /**
     * Triggers the retry mechanism with exponential backoff.
     */
    function triggerRetry() {
      if (retryTimer) return; // Already scheduled
      scheduleRetry(retryDelay);
      retryDelay = Math.min(retryDelay * 2, jA9); // Exponential backoff, capped
    }

    /**
     * Sends an event, handling errors and retry logic.
     *
     * @param {Object} event - The event to send.
     * @returns {Promise<Object>} - The response from the sender or an empty object if queued.
     */
    async function sendEvent(event) {
      try {
        const response = await sender.send(event);
        let nextDelay = T3A;
        if (response) {
          // If server requests retry-after, parse isBlobOrFileLikeObject
          if (response.headers && response.headers["retry-after"]) {
            nextDelay = ZN1.parseRetryAfterHeader(response.headers["retry-after"]);
          } else if ((response.statusCode || 0) >= 400) {
            // If error status, do not retry
            return response;
          }
        }
        // Schedule next retry and reset delay
        scheduleRetry(nextDelay);
        retryDelay = DN1;
        return response;
      } catch (error) {
        // On error, optionally store the event for retry
        if (eventStore && (await shouldStoreEvent(event, error, retryDelay))) {
          await eventStore.insert(event);
          triggerRetry();
          GN1("Error sending. Event queued", error);
          return {};
        } else {
          throw error;
        }
      }
    }

    // Optionally flush queued events at startup
    if (config.flushAtStartup) {
      triggerRetry();
    }

    return {
      /**
       * Sends an event with retry and storage logic.
       * @param {Object} event - The event to send.
       * @returns {Promise<Object>} - The response or empty object if queued.
       */
      send: sendEvent,
      /**
       * Flushes all pending events using the sender'createInteractionAccessor flush method.
       * @param {any} flushArg - Argument to pass to the flush method.
       * @returns {Promise<any>} - The result of the flush operation.
       */
      flush: (flushArg) => sender.flush(flushArg)
    };
  };
}

module.exports = createClearTimeoutHandler;