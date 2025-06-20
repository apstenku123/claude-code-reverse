/**
 * Configures global HTTP/HTTPS proxy settings if a proxy URL is provided.
 *
 * This function checks for a proxy configuration (via rh()), and if present,
 * sets up the global HTTP(s) agent and dispatcher to route requests through the proxy.
 *
 * @returns {void} Does not return a value.
 */
function configureGlobalProxyIfSet() {
  // Retrieve the proxy URL from configuration or environment
  const proxyUrl = rh();

  if (proxyUrl) {
    // Disable Axios'createInteractionAccessor default proxy handling to use a custom agent
    a4.defaults.proxy = false;

    // Set up a custom HTTPS proxy agent using the provided proxy URL
    a4.defaults.httpsAgent = new Qi0.default.HttpsProxyAgent(proxyUrl);

    // Set the global dispatcher for HTTP requests to use the proxy
    Cp1.default.setGlobalDispatcher(Ii0(proxyUrl));
  }
}

module.exports = configureGlobalProxyIfSet;