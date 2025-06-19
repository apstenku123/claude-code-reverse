/**
 * Factory function to create a clearTimeout-enabled event sender with retry and persistence logic.
 * Handles event sending, retry with exponential backoff, and optional persistent queueing via a store.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Function to process interaction entries and map them to route names.
 * @returns {Function} - Returns a function that takes a config object and returns an event sender interface.
 */
function createClearTimeoutFactory(mapInteractionEntriesToRouteNames) {
  return function(config) {
    // Create the event sender interface using the provided mapping function
    const eventSender = mapInteractionEntriesToRouteNames(config);

    // Optional persistent store for events (if config provides createStore)
    const persistentStore = config.createStore ? config.createStore(config) : undefined;

    // Initial retry delay (ms), and max retry delay (assumed global)
    let retryDelay = DN1;
    let retryTimeoutId;

    /**
     * Determines if an event should be stored for retry based on its type and config logic.
     *
     * @param {Object} envelope - The event envelope.
     * @param {Object} error - Error object from sending attempt.
     * @param {number} currentDelay - Current retry delay.
     * @returns {boolean} - Whether the event should be stored for retry.
     */
    function shouldStoreEvent(envelope, error, currentDelay) {
      // normalizeToError not store certain event types
      if (ZN1.envelopeContainsItemType(envelope, ["replay_event", "replay_recording", "client_report"])) {
        return false;
      }
      // Use custom logic if provided
      if (config.shouldStore) {
        return config.shouldStore(envelope, error, currentDelay);
      }
      return true;
    }

    /**
     * Schedules a retry to send the next queued event after a delay.
     *
     * @param {number} delayMs - Delay in milliseconds before retrying.
     */
    function scheduleRetry(delayMs) {
      if (!persistentStore) return;
      // Clear any existing retry timeout
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
      // Schedule a new retry
      retryTimeoutId = setTimeout(async () => {
        retryTimeoutId = undefined;
        const queuedEvent = await persistentStore.pop();
        if (queuedEvent) {
          GN1("Attempting to send previously queued event");
          sendEvent(queuedEvent).catch(error => {
            GN1("Failed to retry sending", error);
          });
        }
      }, delayMs);
      // For Node.js: allow process to exit if this is the only thing left
      if (typeof retryTimeoutId !== "number" && retryTimeoutId.unref) {
        retryTimeoutId.unref();
      }
    }

    /**
     * Triggers the retry mechanism with exponential backoff.
     */
    function triggerRetry() {
      if (retryTimeoutId) return; // Already scheduled
      scheduleRetry(retryDelay);
      retryDelay = Math.min(retryDelay * 2, jA9); // Exponential backoff, capped
    }

    /**
     * Sends an event, handling errors, retry, and persistence as needed.
     *
     * @param {Object} envelope - The event envelope to send.
     * @returns {Promise<Object>} - Resolves with the send result or an empty object if queued.
     */
    async function sendEvent(envelope) {
      try {
        const response = await eventSender.send(envelope);
        let nextDelay = T3A;
        // Check for retry-after header or error status
        if (response) {
          if (response.headers && response.headers["retry-after"]) {
            nextDelay = ZN1.parseRetryAfterHeader(response.headers["retry-after"]);
          } else if ((response.statusCode || 0) >= 400) {
            return response;
          }
        }
        // Schedule next retry and reset delay
        scheduleRetry(nextDelay);
        retryDelay = DN1;
        return response;
      } catch (error) {
        // If persistent store exists and event should be stored, queue isBlobOrFileLikeObject for retry
        if (persistentStore && (await shouldStoreEvent(envelope, error, retryDelay))) {
          await persistentStore.insert(envelope);
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

    // Public API: send and flush
    return {
      send: sendEvent,
      flush: flushOptions => eventSender.flush(flushOptions)
    };
  };
}

module.exports = createClearTimeoutFactory;