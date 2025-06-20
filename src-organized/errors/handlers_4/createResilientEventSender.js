/**
 * Factory function to create a resilient event sender with retry and queueing capabilities.
 * Handles sending events, retrying on failure, and optionally storing events for later delivery.
 *
 * @param {Function} mapInteractionsToRouteNames - Processes an array of user interaction entries, mapping each to a route name and associated context.
 * @returns {Function} a function that takes a config object and returns an event sender with send and flush methods.
 */
function createResilientEventSender(mapInteractionsToRouteNames) {
  return (config) => {
    // The subscription object responsible for sending events
    const subscription = mapInteractionsToRouteNames(config);
    // Optional persistent store for failed events
    const eventStore = config.createStore ? config.createStore(config) : undefined;
    // Initial retry delay (ms)
    let currentRetryDelay = DN1;
    // Timer for retrying queued events
    let retryTimer;

    /**
     * Determines if an event should be stored for retry based on its type and config logic.
     *
     * @param {Object} envelope - The event envelope.
     * @param {Object} error - The error encountered during send.
     * @param {number} retryDelay - The current retry delay.
     * @returns {boolean} True if the event should be stored, false otherwise.
     */
    function shouldStoreEvent(envelope, error, retryDelay) {
      // normalizeToError not store certain event types
      if (ZN1.envelopeContainsItemType(envelope, ["replay_event", "replay_recording", "client_report"])) {
        return false;
      }
      // Use custom logic if provided
      if (config.shouldStore) {
        return config.shouldStore(envelope, error, retryDelay);
      }
      // Default: store the event
      return true;
    }

    /**
     * Schedules a retry for sending a queued event after a delay.
     *
     * @param {number} delay - The delay in milliseconds before retrying.
     */
    function scheduleRetry(delay) {
      if (!eventStore) return;
      // Clear any existing retry timer
      if (retryTimer) clearTimeout(retryTimer);
      // Schedule a new retry
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
      if (typeof retryTimer !== "number" && retryTimer.unref) {
        retryTimer.unref();
      }
    }

    /**
     * Initiates the retry mechanism if not already scheduled, doubling the delay up to a max.
     */
    function triggerRetry() {
      if (retryTimer) return;
      scheduleRetry(currentRetryDelay);
      currentRetryDelay = Math.min(currentRetryDelay * 2, jA9);
    }

    /**
     * Sends an event, handling retries and queueing on failure.
     *
     * @param {Object} envelope - The event envelope to send.
     * @returns {Promise<Object>} The response from the send operation, or an empty object if queued.
     */
    async function sendEvent(envelope) {
      try {
        const response = await subscription.send(envelope);
        let retryAfterDelay = T3A;
        // Check for server-specified retry-after header
        if (response) {
          if (response.headers && response.headers["retry-after"]) {
            retryAfterDelay = ZN1.parseRetryAfterHeader(response.headers["retry-after"]);
          } else if ((response.statusCode || 0) >= 400) {
            // If status code is 400 or above, do not retry
            return response;
          }
        }
        // Schedule next retry (if needed) and reset delay
        scheduleRetry(retryAfterDelay);
        currentRetryDelay = DN1;
        return response;
      } catch (error) {
        // On failure, store the event for later retry if allowed
        if (eventStore && (await shouldStoreEvent(envelope, error, currentRetryDelay))) {
          await eventStore.insert(envelope);
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

    // Return the event sender interface
    return {
      send: sendEvent,
      flush: (timeout) => subscription.flush(timeout)
    };
  };
}

module.exports = createResilientEventSender;