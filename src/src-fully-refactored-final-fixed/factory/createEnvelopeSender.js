/**
 * Factory function that creates an envelope sender object with send and flush capabilities.
 * It manages endpoint resolution and caching for sending envelopes to various DSNs (Data Source Names).
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries and return a transport instance.
 * @param {Function} envelopeConfigMapper - Function that maps an envelope and a initializeInteractionEventTracking function to an array of DSN/release objects or strings.
 * @returns {Function} - Returns a function that takes a subscription context and returns an object with send and flush methods.
 */
function createEnvelopeSender(processInteractionEntries, envelopeConfigMapper) {
  return (subscriptionContext) => {
    // The default transport instance for the provided subscription context
    const defaultTransport = processInteractionEntries(subscriptionContext);
    // Cache for transport instances keyed by DSN and release
    const transportCache = new Map();

    /**
     * Resolves or creates a transport for a given DSN and optional release.
     * Caches the transport for reuse.
     *
     * @param {string} dsnString - The DSN string to resolve.
     * @param {string|undefined} release - Optional release identifier.
     * @returns {[string, Object]|undefined} - Tuple of DSN string and transport instance, or undefined if DSN is invalid.
     */
    function resolveTransport(dsnString, release) {
      // Create a unique cache key based on DSN and release
      const cacheKey = release ? `${dsnString}:${release}` : dsnString;
      let transport = transportCache.get(cacheKey);
      if (!transport) {
        // Parse the DSN string
        const dsnObject = YN1.dsnFromString(dsnString);
        if (!dsnObject) return;
        // Get the endpoint URL with authentication
        const endpointUrl = vA9.getEnvelopeEndpointWithUrlEncodedAuth(dsnObject, subscriptionContext.tunnel);
        // If release is provided, use withReleaseOnEventSend to create a specialized transport, otherwise use the default
        transport = release
          ? withReleaseOnEventSend(processInteractionEntries, release)({
              ...subscriptionContext,
              url: endpointUrl
            })
          : processInteractionEntries({
              ...subscriptionContext,
              url: endpointUrl
            });
        transportCache.set(cacheKey, transport);
      }
      return [dsnString, transport];
    }

    /**
     * Sends the provided envelope using the appropriate transport(createInteractionAccessor).
     *
     * @param {Object} envelope - The envelope to send.
     * @returns {Promise<*>} - Resolves with the result of the send operation.
     */
    async function sendEnvelope(envelope) {
      /**
       * Helper to extract event types from the envelope.
       *
       * @param {Array|string} eventTypes - Event types or undefined.
       * @returns {Array} - Array of event types.
       */
      function getEventTypes(eventTypes) {
        // Default to ["event"] if not provided or empty
        return eventTypes && eventTypes.length ? eventTypes : ["event"];
      }

      // Map envelope config to an array of DSN/release pairs or strings
      const transportTargets = envelopeConfigMapper({
        envelope,
        initializeInteractionEventTracking: getEventTypes
      })
        .map(target => {
          // If target is a string, resolve transport with DSN only
          if (typeof target === "string") {
            return resolveTransport(target, undefined);
          } else {
            // Otherwise, resolve with DSN and release
            return resolveTransport(target.dsn, target.release);
          }
        })
        // Filter out any unresolved transports
        .filter(Boolean);

      // If no transports were resolved, use the default
      if (transportTargets.length === 0) {
        transportTargets.push(["", defaultTransport]);
      }

      // Send the envelope using all resolved transports, return the result of the first
      const sendResults = await Promise.all(
        transportTargets.map(([dsn, transport]) => transport.send(gA9(envelope, dsn)))
      );
      return sendResults[0];
    }

    /**
     * Flushes all transports (default and cached) with the provided timeout.
     *
     * @param {number} timeout - Timeout in milliseconds for the flush operation.
     * @returns {Promise<boolean>} - Resolves to true if all flushes succeeded, false otherwise.
     */
    async function flushAllTransports(timeout) {
      // Start with the default transport'createInteractionAccessor flush
      const flushResults = [await defaultTransport.flush(timeout)];
      // Flush all cached transports
      for (const [, transport] of transportCache) {
        flushResults.push(await transport.flush(timeout));
      }
      // Return true only if all flushes succeeded
      return flushResults.every(result => result);
    }

    return {
      send: sendEnvelope,
      flush: flushAllTransports
    };
  };
}

module.exports = createEnvelopeSender;
