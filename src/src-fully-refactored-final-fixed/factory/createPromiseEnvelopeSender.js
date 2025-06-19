/**
 * Factory function that creates an envelope sender with caching and flushing capabilities.
 *
 * @param {Function} mapInteractionsToRoutes - Processes a subscription and returns a transport instance.
 * @param {Function} addActivityIfNotFinished - Given an object with envelope and initializeInteractionEventTracking, returns an array of DSN strings or objects.
 * @returns {Function} - Returns a function that takes a subscription and provides send and flush methods.
 */
function createPromiseEnvelopeSender(mapInteractionsToRoutes, addActivityIfNotFinished) {
  return function initializeEnvelopeSender(subscription) {
    // The default transport instance for the given subscription
    const defaultTransport = mapInteractionsToRoutes(subscription);
    // Cache for transport instances keyed by DSN and release
    const transportCache = new Map();

    /**
     * Retrieves or creates a transport for a given DSN and optional release.
     *
     * @param {string} dsnString - The DSN string.
     * @param {string|undefined} release - Optional release identifier.
     * @returns {[string, Object]|undefined} - Tuple of DSN and transport instance, or undefined if DSN is invalid.
     */
    function getOrCreateTransport(dsnString, release) {
      // Create a unique cache key based on DSN and release
      const cacheKey = release ? `${dsnString}:${release}` : dsnString;
      let transport = transportCache.get(cacheKey);
      if (!transport) {
        // Parse DSN from string
        const dsn = YN1.dsnFromString(dsnString);
        if (!dsn) return;
        // Get the endpoint URL for the DSN
        const endpointUrl = vA9.getEnvelopeEndpointWithUrlEncodedAuth(dsn, subscription.tunnel);
        // If release is provided, use withReleaseOnEventSend to create a transport, otherwise use the default
        transport = release
          ? withReleaseOnEventSend(mapInteractionsToRoutes, release)({ ...subscription, url: endpointUrl })
          : mapInteractionsToRoutes({ ...subscription, url: endpointUrl });
        // Cache the transport for future use
        transportCache.set(cacheKey, transport);
      }
      return [dsnString, transport];
    }

    /**
     * Sends an envelope using the appropriate transport(createInteractionAccessor).
     *
     * @param {Object} envelope - The envelope to send.
     * @returns {Promise<*>} - Resolves with the result of the send operation.
     */
    async function sendEnvelope(envelope) {
      /**
       * Helper to get event types from the envelope.
       * @param {Array|string|undefined} envelopeItems
       * @returns {Array}
       */
      function getEventTypes(envelopeItems) {
        return envelopeItems && envelopeItems.length ? envelopeItems : ["event"];
      }

      // Use addActivityIfNotFinished to get DSN targets for the envelope
      const targets = addActivityIfNotFinished({
        envelope,
        initializeInteractionEventTracking: getEventTypes
      })
        .map(target => {
          // If target is a string, treat as DSN with no release
          if (typeof target === "string") {
            return getOrCreateTransport(target, undefined);
          } else {
            // Otherwise, treat as object with dsn and release
            return getOrCreateTransport(target.dsn, target.release);
          }
        })
        .filter(Boolean); // Remove undefined results

      // If no targets found, use the default transport
      if (targets.length === 0) {
        targets.push(["", defaultTransport]);
      }

      // Send the envelope to all targets and return the first result
      const sendResults = await Promise.all(
        targets.map(([dsnString, transport]) => transport.send(gA9(envelope, dsnString)))
      );
      return sendResults[0];
    }

    /**
     * Flushes all transports (default and cached) with the given timeout.
     *
     * @param {number} timeout - The flush timeout in milliseconds.
     * @returns {Promise<boolean>} - Resolves true if all flushes succeed, false otherwise.
     */
    async function flushAllTransports(timeout) {
      // Start with the default transport
      const flushPromises = [await defaultTransport.flush(timeout)];
      // Add flushes for all cached transports
      for (const [, transport] of transportCache) {
        flushPromises.push(await transport.flush(timeout));
      }
      // Return true if all flushes succeeded
      return flushPromises.every(result => result);
    }

    // Expose send and flush methods
    return {
      send: sendEnvelope,
      flush: flushAllTransports
    };
  };
}

module.exports = createPromiseEnvelopeSender;