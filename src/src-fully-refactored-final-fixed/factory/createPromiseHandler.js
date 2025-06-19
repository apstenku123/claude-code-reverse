/**
 * Factory function to create a promise-based handler for sending and flushing envelopes.
 *
 * @param {Function} processInteractionEntries - Processes interaction entries and returns a transport instance.
 * @param {Function} envelopeConfigMapper - Maps an envelope and event getter to a list of DSN/release targets.
 * @returns {Function} Returns a function that takes a subscription context and provides send/flush methods.
 */
function createPromiseHandler(processInteractionEntries, envelopeConfigMapper) {
  return (subscription) => {
    // The default transport instance for the given subscription
    const defaultTransport = processInteractionEntries(subscription);
    // Cache for transport instances keyed by DSN and release
    const transportCache = new Map();

    /**
     * Retrieves or creates a transport instance for a given DSN and release.
     *
     * @param {string} dsnString - The DSN string.
     * @param {string|undefined} release - Optional release identifier.
     * @returns {[string, Object]|undefined} Tuple of DSN string and transport instance, or undefined if DSN is invalid.
     */
    function getOrCreateTransport(dsnString, release) {
      // Create a unique cache key based on DSN and release
      const cacheKey = release ? `${dsnString}:${release}` : dsnString;
      let transport = transportCache.get(cacheKey);
      if (!transport) {
        // Parse the DSN string
        const dsn = YN1.dsnFromString(dsnString);
        if (!dsn) return;
        // Get the envelope endpoint URL with encoded auth
        const envelopeEndpoint = vA9.getEnvelopeEndpointWithUrlEncodedAuth(dsn, subscription.tunnel);
        // Create a new transport instance, possibly using a release-specific factory
        transport = release
          ? withReleaseOnEventSend(processInteractionEntries, release)({ ...subscription, url: envelopeEndpoint })
          : processInteractionEntries({ ...subscription, url: envelopeEndpoint });
        // Cache the transport instance
        transportCache.set(cacheKey, transport);
      }
      return [dsnString, transport];
    }

    /**
     * Sends an envelope using the appropriate transport(createInteractionAccessor) based on the envelope config mapping.
     *
     * @param {Object} envelope - The envelope to send.
     * @returns {Promise<*>} Resolves with the result of the first transport'createInteractionAccessor send operation.
     */
    async function sendEnvelope(envelope) {
      /**
       * Helper to extract event types from the envelope.
       *
       * @param {Array|string} eventTypes - Event types or empty.
       * @returns {Array} Array of event types.
       */
      function getEventTypes(eventTypes) {
        return eventTypes && eventTypes.length ? eventTypes : ["event"];
      }

      // Map the envelope to a list of DSN/release targets using the config mapper
      const transportTargets = envelopeConfigMapper({
        envelope,
        initializeInteractionEventTracking: getEventTypes
      })
        .map(target => {
          // If the target is a string, treat as DSN only
          if (typeof target === "string") {
            return getOrCreateTransport(target, undefined);
          } else {
            // Otherwise, use DSN and release
            return getOrCreateTransport(target.dsn, target.release);
          }
        })
        .filter(Boolean); // Remove any undefined entries

      // If no targets found, use the default transport
      if (transportTargets.length === 0) {
        transportTargets.push(["", defaultTransport]);
      }

      // Send the envelope using all transports, return the result of the first
      const sendResults = await Promise.all(
        transportTargets.map(([dsnString, transport]) =>
          transport.send(gA9(envelope, dsnString))
        )
      );
      return sendResults[0];
    }

    /**
     * Flushes all transport instances (default and cached) within the given timeout.
     *
     * @param {number} timeout - The flush timeout in milliseconds.
     * @returns {Promise<boolean>} Resolves true if all flushes succeed, false otherwise.
     */
    async function flushAllTransports(timeout) {
      // Start with the default transport
      const flushPromises = [await defaultTransport.flush(timeout)];
      // Add all cached transports
      for (const [, transport] of transportCache) {
        flushPromises.push(await transport.flush(timeout));
      }
      // Return true if all flushes succeeded
      return flushPromises.every(result => result);
    }

    // Return the handler interface
    return {
      send: sendEnvelope,
      flush: flushAllTransports
    };
  };
}

module.exports = createPromiseHandler;