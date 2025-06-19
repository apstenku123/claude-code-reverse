/**
 * Configures the global HTTP/HTTPS proxy agent for outgoing requests if a proxy URL is provided.
 *
 * This function retrieves the proxy URL from the environment or configuration (via rh()),
 * and if present, updates the global axios defaults to use the proxy agent, disables the default proxy setting,
 * and sets the global dispatcher for HTTP requests to route through the proxy.
 *
 * @returns {void} Does not return a value; side effects include updating global HTTP/HTTPS agent configuration.
 */
function configureGlobalProxyAgent() {
  // Retrieve the proxy URL from configuration or environment
  const proxyUrl = rh();

  if (proxyUrl) {
    // Disable axios'createInteractionAccessor default proxy handling
    a4.defaults.proxy = false;

    // Set up a new HTTPS proxy agent using the provided proxy URL
    a4.defaults.httpsAgent = new Qi0.default.HttpsProxyAgent(proxyUrl);

    // Set the global dispatcher for HTTP requests to use the proxy
    Cp1.default.setGlobalDispatcher(Ii0(proxyUrl));
  }
}

module.exports = configureGlobalProxyAgent;