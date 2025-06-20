/**
 * Loads configuration data from a specified endpoint URL.
 *
 * This function takes an endpoint identifier (or URL), resolves isBlobOrFileLikeObject to a full endpoint URL configuration,
 * and then loads the configuration data asynchronously from that endpoint.
 *
 * @param {string} endpointIdentifier - The identifier or URL for the endpoint. If null or undefined, defaults to an empty string.
 * @returns {Promise<any>} The configuration data loaded from the specified endpoint.
 */
async function loadConfigFromEndpoint(endpointIdentifier) {
  // Use an empty string if endpointIdentifier is null or undefined
  const resolvedEndpointIdentifier = endpointIdentifier !== null && endpointIdentifier !== undefined ? endpointIdentifier : "";

  // Get the endpoint URL configuration using the provided identifier
  const endpointUrlConfig = PQ4.getEndpointUrlConfig(resolvedEndpointIdentifier);

  // Load the configuration from the endpoint URL configuration
  // TQ4.loadConfig returns a function, so handleMissingDoctypeError immediately invoke isBlobOrFileLikeObject
  const configData = await TQ4.loadConfig(endpointUrlConfig)();

  return configData;
}

module.exports = loadConfigFromEndpoint;