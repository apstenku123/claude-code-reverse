/**
 * Factory function that creates a promise-based sender and flusher for envelopes.
 * It manages endpoint resolution and memoization for efficient network usage.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Processes an envelope and returns a sender instance.
 * @param {Function} envelopeConfigMapper - Maps envelope and event getter to a list of DSN/release targets.
 * @returns {Function} - a function that takes a subscription context and returns an object with send and flush methods.
 */
function createPromiseHandler(mapInteractionEntriesToRouteNames, envelopeConfigMapper) {
  return function initializePromiseSender(subscriptionContext) {
    // Default sender instance for the provided context
    const defaultSender = mapInteractionEntriesToRouteNames(subscriptionContext);
    // Memoization map for endpoint-specific sender instances
    const senderCache = new Map();

    /**
     * Resolves or creates a sender instance for a given DSN and optional release.
     * Memoizes the sender for future use.
     *
     * @param {string} dsnString - The DSN string to resolve.
     * @param {string|undefined} release - Optional release identifier.
     * @returns {[string, Object]|undefined} - Tuple of DSN and sender instance, or undefined if DSN is invalid.
     */
    function getOrCreateSenderForDsn(dsnString, release) {
      const cacheKey = release ? `${dsnString}:${release}` : dsnString;
      let senderInstance = senderCache.get(cacheKey);
      if (!senderInstance) {
        // Parse DSN string into DSN object
        const dsnObject = YN1.dsnFromString(dsnString);
        if (!dsnObject) return;
        // Resolve endpoint URL with optional tunnel
        const endpointUrl = vA9.getEnvelopeEndpointWithUrlEncodedAuth(dsnObject, subscriptionContext.tunnel);
        // Create a sender instance for this endpoint
        senderInstance = release
          ? withReleaseOnEventSend(mapInteractionEntriesToRouteNames, release)({
              ...subscriptionContext,
              url: endpointUrl
            })
          : mapInteractionEntriesToRouteNames({
              ...subscriptionContext,
              url: endpointUrl
            });
        senderCache.set(cacheKey, senderInstance);
      }
      return [dsnString, senderInstance];
    }

    /**
     * Sends the envelope to all resolved endpoints.
     *
     * @param {Object} envelope - The envelope to send.
     * @returns {Promise<*>} - Resolves with the result of the first send operation.
     */
    async function sendEnvelope(envelope) {
      /**
       * Helper to get event types from envelope.
       *
       * @param {Array|string} eventTypes - Event types or fallback.
       * @returns {Array} - Array of event types.
       */
      function getEventTypes(eventTypes) {
        // Default to ["event"] if none provided
        const types = eventTypes && eventTypes.length ? eventTypes : ["event"];
        return WN1(envelope, types);
      }

      // Map envelope config to DSN/release targets
      const targets = envelopeConfigMapper({
        envelope,
        initializeInteractionEventTracking: getEventTypes
      })
        .map(target => {
          if (typeof target === "string") {
            // Only DSN string
            return getOrCreateSenderForDsn(target, undefined);
          } else {
            // Object with DSN and release
            return getOrCreateSenderForDsn(target.dsn, target.release);
          }
        })
        .filter(Boolean); // Remove undefined entries

      // If no targets, fall back to default sender
      if (targets.length === 0) {
        targets.push(["", defaultSender]);
      }

      // Send envelope to all targets and return the result of the first
      const sendResults = await Promise.all(
        targets.map(([dsn, sender]) => sender.send(gA9(envelope, dsn)))
      );
      return sendResults[0];
    }

    /**
     * Flushes all sender instances (default and memoized).
     *
     * @param {number} timeout - The flush timeout in milliseconds.
     * @returns {Promise<boolean>} - Resolves true if all flushes succeed, false otherwise.
     */
    async function flushAllSenders(timeout) {
      // Start with default sender
      const flushPromises = [await defaultSender.flush(timeout)];
      // Add all memoized senders
      for (const [, senderInstance] of senderCache) {
        flushPromises.push(await senderInstance.flush(timeout));
      }
      // Return true if all flushes succeeded
      return flushPromises.every(result => result);
    }

    return {
      send: sendEnvelope,
      flush: flushAllSenders
    };
  };
}

module.exports = createPromiseHandler;