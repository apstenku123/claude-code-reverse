/**
 * Generates a configuration object for making HTTP requests to a local API endpoint.
 * Merges shared configuration defaults with custom headers and agent options.
 *
 * @param {Object} requestHeaders - An object representing HTTP headers to be used in the request.
 * @param {string} endpointPath - The path to append to the local API base URL.
 * @returns {Object} The complete configuration object for the HTTP request.
 */
function createLocalApiRequestConfig(requestHeaders, endpointPath) {
  return {
    // Merge in shared configuration defaults
    ...TO0.getSharedConfigurationDefaults(),
    // Provide headers as a function returning the headers object
    headers: () => requestHeaders,
    // Construct the full URL for the local API endpoint
    url: `http://localhost:4318/${endpointPath}`,
    // Set agent options to keep the connection alive
    agentOptions: {
      keepAlive: true
    }
  };
}

module.exports = createLocalApiRequestConfig;