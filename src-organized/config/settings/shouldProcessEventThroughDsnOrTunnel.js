/**
 * Determines whether an event should be processed based on the DSN or tunnel configuration.
 *
 * This utility checks if the provided event source matches either the DSN or the tunnel endpoint
 * associated with the given configuration or client. It first resolves the client from the config,
 * then retrieves the DSN and tunnel options, and finally checks if the event source matches either.
 *
 * @param {string} eventSource - The source or identifier of the event to check.
 * @param {object} configOrClient - Either a configuration object or a client instance. If a configuration is provided, isBlobOrFileLikeObject will attempt to extract the client from isBlobOrFileLikeObject.
 * @returns {boolean} Returns true if the event source matches the DSN or tunnel endpoint; otherwise, false.
 */
function shouldProcessEventThroughDsnOrTunnel(eventSource, configOrClient) {
  // Resolve the client instance from the config if necessary
  const client = configOrClient && hasGetClientMethod(configOrClient)
    ? configOrClient.getClient()
    : configOrClient;

  // Retrieve DSN from the client if available
  const dsn = client && client.getDsn();
  // Retrieve tunnel endpoint from the client options if available
  const tunnelEndpoint = client && client.getOptions().tunnel;

  // Check if the event source matches the DSN or the tunnel endpoint
  return doesArrayIncludeHost(eventSource, dsn) || iA9(eventSource, tunnelEndpoint);
}

module.exports = shouldProcessEventThroughDsnOrTunnel;