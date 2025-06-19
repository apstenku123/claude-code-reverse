/**
 * Determines if an event should be processed for a given client or tunnel configuration.
 *
 * This utility checks if the provided event (sourceObservable) matches either the client'createInteractionAccessor DSN
 * or the tunnel URL, based on the configuration object. It supports both direct client objects
 * and objects with a getClient() method.
 *
 * @param {any} sourceObservable - The event or observable to check.
 * @param {object} config - The configuration object, which may be a client or an object with getClient().
 * @returns {boolean} True if the event matches the client'createInteractionAccessor DSN or the tunnel URL; otherwise, false.
 */
function shouldProcessEventForClientOrTunnel(sourceObservable, config) {
  // Determine the client object: use getClient() if available and valid, otherwise use config directly
  const client = config && hasGetClientMethod(config) ? config.getClient() : config;

  // Extract the DSN from the client, if available
  const clientDsn = client && client.getDsn();

  // Extract the tunnel URL from the client options, if available
  const tunnelUrl = client && client.getOptions().tunnel;

  // Check if the event matches either the DSN or the tunnel URL
  return doesArrayIncludeHost(sourceObservable, clientDsn) || iA9(sourceObservable, tunnelUrl);
}

module.exports = shouldProcessEventForClientOrTunnel;