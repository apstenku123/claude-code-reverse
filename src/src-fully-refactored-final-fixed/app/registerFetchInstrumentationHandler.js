/**
 * Registers a fetch instrumentation handler that triggers a callback when a fetch event
 * occurs for a specific client. The handler will only be registered if native fetch is supported.
 *
 * @param {string} targetClientId - The client identifier to match against the current client.
 * @param {object} instrumentationConfig - Configuration object passed to the instrumentation callback.
 * @returns {void}
 */
function registerFetchInstrumentationHandler(targetClientId, instrumentationConfig) {
  // Check if the environment supports native fetch
  if (!aH.supportsNativeFetch()) return;

  // Register a handler for fetch instrumentation events
  aH.addFetchInstrumentationHandler(fetchEvent => {
    // Only proceed if the current client matches the target client
    if (VU.getClient() !== targetClientId) return;

    // Destructure the fetch response and arguments from the event
    const { response: fetchResponse, args: fetchArgs } = fetchEvent;
    const [requestUrl, createRequestOptions] = fetchArgs;

    // If there is no response, do nothing
    if (!fetchResponse) return;

    // Call the instrumentation callback with the provided config and fetch details
    OD9(instrumentationConfig, requestUrl, fetchResponse, createRequestOptions);
  });
}

module.exports = registerFetchInstrumentationHandler;