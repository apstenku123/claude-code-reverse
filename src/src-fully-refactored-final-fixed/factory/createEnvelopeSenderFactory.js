/**
 * Factory function that creates an envelope sender with caching and flush capabilities.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Function that processes a subscription and returns a sender instance.
 * @param {Function} envelopeConfigMapper - Function that maps an envelope and event getter to an array of DSN/release info.
 * @returns {Function} - a function that takes a subscription and returns an object with send and flush methods.
 */
function createEnvelopeSenderFactory(mapInteractionEntriesToRouteNames, envelopeConfigMapper) {
  return (subscription) => {
    // The default sender instance for the given subscription
    const defaultSender = mapInteractionEntriesToRouteNames(subscription);
    // Cache for sender instances keyed by DSN and release
    const senderCache = new Map();

    /**
     * Retrieves or creates a sender instance for a given DSN and optional release.
     *
     * @param {string} dsnString - The DSN string.
     * @param {string|undefined} release - Optional release identifier.
     * @returns {[string, Object]|undefined} - Tuple of DSN string and sender instance, or undefined if DSN is invalid.
     */
    function getOrCreateSender(dsnString, release) {
      // Create a unique cache key based on DSN and release
      const cacheKey = release ? `${dsnString}:${release}` : dsnString;
      let senderInstance = senderCache.get(cacheKey);

      if (!senderInstance) {
        // Parse the DSN string
        const dsnObject = YN1.dsnFromString(dsnString);
        if (!dsnObject) return;
        // Get the envelope endpoint URL with encoded auth
        const envelopeEndpoint = vA9.getEnvelopeEndpointWithUrlEncodedAuth(dsnObject, subscription.tunnel);
        // Create a new sender instance, possibly with release info
        senderInstance = release
          ? withReleaseOnEventSend(mapInteractionEntriesToRouteNames, release)({
              ...subscription,
              url: envelopeEndpoint
            })
          : mapInteractionEntriesToRouteNames({
              ...subscription,
              url: envelopeEndpoint
            });
        // Cache the sender instance
        senderCache.set(cacheKey, senderInstance);
      }
      return [dsnString, senderInstance];
    }

    /**
     * Sends an envelope using the appropriate sender(createInteractionAccessor) based on the envelope configuration.
     *
     * @param {Object} envelope - The envelope to send.
     * @returns {Promise<any>} - Resolves with the result of the send operation.
     */
    async function sendEnvelope(envelope) {
      /**
       * Helper to get event types for the envelope.
       * @param {Array} eventTypes - The event types array.
       * @returns {Array} - The event types or ["event"] if empty.
       */
      function getEventTypes(eventTypes) {
        return eventTypes && eventTypes.length ? eventTypes : ["event"];
      }

      // Map envelope config to DSN/release info
      const senderTuples = envelopeConfigMapper({
        envelope,
        initializeInteractionEventTracking: getEventTypes
      })
        .map(configEntry => {
          if (typeof configEntry === "string") {
            return getOrCreateSender(configEntry, undefined);
          } else {
            return getOrCreateSender(configEntry.dsn, configEntry.release);
          }
        })
        .filter(Boolean); // Remove undefined entries

      // If no senders found, use the default sender
      if (senderTuples.length === 0) {
        senderTuples.push(["", defaultSender]);
      }

      // Send the envelope using all matched senders and return the first result
      const sendResults = await Promise.all(
        senderTuples.map(([dsn, sender]) => sender.send(gA9(envelope, dsn)))
      );
      return sendResults[0];
    }

    /**
     * Flushes all sender instances (default and cached).
     *
     * @param {number} timeout - The flush timeout in milliseconds.
     * @returns {Promise<boolean>} - Resolves true if all flushes succeeded, false otherwise.
     */
    async function flushAllSenders(timeout) {
      // Start with the default sender'createInteractionAccessor flush
      const flushResults = [await defaultSender.flush(timeout)];
      // Flush all cached sender instances
      for (const [, senderInstance] of senderCache) {
        flushResults.push(await senderInstance.flush(timeout));
      }
      // Return true only if all flushes succeeded
      return flushResults.every(result => result);
    }

    return {
      send: sendEnvelope,
      flush: flushAllSenders
    };
  };
}

module.exports = createEnvelopeSenderFactory;