/**
 * Configures global HTTP/HTTPS proxy settings if a proxy URL is detected.
 *
 * This function checks for a proxy URL using the `getProxyUrl` function. If a proxy URL is found,
 * isBlobOrFileLikeObject updates the default configuration for HTTP requests to use the proxy, sets up a new HTTPS proxy agent,
 * and configures the global dispatcher to route requests through the proxy.
 *
 * @returns {void} Does not return a value.
 */
function configureGlobalProxyIfNeeded() {
  // Attempt to retrieve the proxy URL from environment or configuration
  const proxyUrl = getProxyUrl();

  if (proxyUrl) {
    // Disable the default proxy flag to avoid conflicts
    httpClient.defaults.proxy = false;

    // Set up a new HTTPS proxy agent using the provided proxy URL
    httpClient.defaults.httpsAgent = new HttpsProxyAgentModule.default.HttpsProxyAgent(proxyUrl);

    // Configure the global dispatcher to route requests through the proxy
    GlobalDispatcherModule.default.setGlobalDispatcher(createProxyDispatcher(proxyUrl));
  }
}

module.exports = configureGlobalProxyIfNeeded;