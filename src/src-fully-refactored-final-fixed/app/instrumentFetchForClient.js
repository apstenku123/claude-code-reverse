/**
 * Adds a fetch instrumentation handler for a specific client, invoking a callback when fetch responses are available.
 *
 * @param {string} clientIdentifier - The identifier of the client to instrument fetches for.
 * @param {object} instrumentationConfig - Configuration object passed to the instrumentation callback.
 * @returns {void}
 */
function instrumentFetchForClient(clientIdentifier, instrumentationConfig) {
  // Check if the environment supports native fetch instrumentation
  if (!aH.supportsNativeFetch()) return;

  // Register a handler that will be called on every fetch instrumentation event
  aH.addFetchInstrumentationHandler(subscription => {
    // Only proceed if the current client matches the provided identifier
    if (VU.getClient() !== clientIdentifier) return;

    // Destructure the response and arguments from the subscription object
    const { response: fetchResponse, args: fetchArgs } = subscription;
    const [requestUrl, createRequestOptions] = fetchArgs;

    // If there is no response, do not proceed
    if (!fetchResponse) return;

    // Call the external handler with the config, request URL, response, and options
    OD9(instrumentationConfig, requestUrl, fetchResponse, createRequestOptions);
  });
}

module.exports = instrumentFetchForClient;