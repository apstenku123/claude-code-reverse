/**
 * Factory function that creates an event sender with retry and persistence capabilities.
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries and return a sender interface.
 * @returns {Function} - a function that takes a config object and returns an event sender interface.
 */
function createEventSenderFactory(processInteractionEntries) {
  /**
   * Creates an event sender with retry and persistence logic.
   *
   * @param {Object} config - Configuration object for the event sender.
   * @param {Function} [config.createStore] - Optional function to create a persistent store for events.
   * @param {Function} [config.shouldStore] - Optional function to determine if an event should be stored on failure.
   * @param {boolean} [config.flushAtStartup] - Whether to flush queued events at startup.
   * @returns {Object} - Event sender interface with send and flush methods.
   */
  return (config) => {
    const subscription = processInteractionEntries(config);
    const persistentStore = config.createStore ? config.createStore(config) : undefined;
    let retryDelay = DN1; // Initial retry delay (external constant)
    let retryTimeoutId;

    /**
     * Determines if an event should be stored for retry based on its type and config.shouldStore.
     *
     * @param {Object} envelope - The event envelope.
     * @param {Object} error - The error encountered during sending.
     * @param {number} currentDelay - The current retry delay.
     * @returns {boolean} - Whether the event should be stored.
     */
    function shouldStoreEvent(envelope, error, currentDelay) {
      // normalizeToError not store certain event types
      if (ZN1.envelopeContainsItemType(envelope, ["replay_event", "replay_recording", "client_report"])) {
        return false;
      }
      // Use custom shouldStore logic if provided
      if (config.shouldStore) {
        return config.shouldStore(envelope, error, currentDelay);
      }
      return true;
    }

    /**
     * Schedules a retry attempt after a specified delay.
     *
     * @param {number} delay - Delay in milliseconds before retrying.
     */
    function scheduleRetry(delay) {
      if (!persistentStore) return;
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
      retryTimeoutId = setTimeout(async () => {
        retryTimeoutId = undefined;
        const queuedEnvelope = await persistentStore.pop();
        if (queuedEnvelope) {
          GN1("Attempting to send previously queued event");
          sendEvent(queuedEnvelope).catch((error) => {
            GN1("Failed to retry sending", error);
          });
        }
      }, delay);
      // For Node.js: allow process to exit if this is the only thing left
      if (typeof retryTimeoutId !== "number" && retryTimeoutId.unref) {
        retryTimeoutId.unref();
      }
    }

    /**
     * Initiates the retry mechanism with exponential backoff.
     */
    function triggerRetry() {
      if (retryTimeoutId) return; // Already scheduled
      scheduleRetry(retryDelay);
      retryDelay = Math.min(retryDelay * 2, jA9); // Exponential backoff, capped at jA9
    }

    /**
     * Sends an event, handling retries and persistence on failure.
     *
     * @param {Object} envelope - The event envelope to send.
     * @returns {Promise<Object>} - The response from the send operation or an empty object if queued.
     */
    async function sendEvent(envelope) {
      try {
        const response = await subscription.send(envelope);
        let nextRetryDelay = T3A; // Default retry delay (external constant)
        if (response) {
          // Check for retry-after header
          if (response.headers && response.headers["retry-after"]) {
            nextRetryDelay = ZN1.parseRetryAfterHeader(response.headers["retry-after"]);
          } else if ((response.statusCode || 0) >= 400) {
            // normalizeToError not retry on HTTP errors
            return response;
          }
        }
        // Schedule next retry attempt
        scheduleRetry(nextRetryDelay);
        retryDelay = DN1; // Reset retry delay
        return response;
      } catch (error) {
        // If persistent store is available and event should be stored, queue isBlobOrFileLikeObject for retry
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

    return {
      send: sendEvent,
      flush: (timeout) => subscription.flush(timeout)
    };
  };
}

module.exports = createEventSenderFactory;