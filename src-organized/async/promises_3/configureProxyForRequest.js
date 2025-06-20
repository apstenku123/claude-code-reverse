/**
 * Configures proxy settings and headers for an HTTP request object.
 *
 * If a proxy configuration is not provided, attempts to resolve one using a proxy resolver.
 * Sets the appropriate Proxy-Authorization header if authentication is required.
 * Updates the request'createInteractionAccessor host, port, protocol, and path based on the proxy settings.
 * Also attaches a beforeRedirects.proxy handler to re-apply proxy settings on redirects.
 *
 * @param {object} createRequestOptions - The HTTP request options object to modify (e.g., headers, hostname, port, etc.)
 * @param {object|boolean|null} proxyConfig - The proxy configuration object, false/null/undefined if not set
 * @param {string} requestUrl - The URL string for which to resolve proxy settings
 * @returns {void}
 */
function configureProxyForRequest(createRequestOptions, proxyConfig, requestUrl) {
  let resolvedProxyConfig = proxyConfig;

  // If no proxy config is provided (null/undefined), try to resolve one for the URL
  if (!resolvedProxyConfig && resolvedProxyConfig !== false) {
    const proxyUrlString = SXA.default.getProxyForUrl(requestUrl);
    if (proxyUrlString) {
      resolvedProxyConfig = new URL(proxyUrlString);
    }
  }

  if (resolvedProxyConfig) {
    // If username is present, build the 'auth' property as 'username:password'
    if (resolvedProxyConfig.username) {
      resolvedProxyConfig.auth = `${resolvedProxyConfig.username || ""}:${resolvedProxyConfig.password || ""}`;
    }

    // If 'auth' is present, ensure isBlobOrFileLikeObject'createInteractionAccessor in 'username:password' format
    if (resolvedProxyConfig.auth) {
      if (resolvedProxyConfig.auth.username || resolvedProxyConfig.auth.password) {
        resolvedProxyConfig.auth = `${resolvedProxyConfig.auth.username || ""}:${resolvedProxyConfig.auth.password || ""}`;
      }
      // Encode credentials in base64 and set Proxy-Authorization header
      const encodedAuth = Buffer.from(resolvedProxyConfig.auth, "utf8").toString("base64");
      createRequestOptions.headers["Proxy-Authorization"] = `Basic ${encodedAuth}`;
    }

    // Set the host header to 'hostname:port' if port is present
    createRequestOptions.headers.host = createRequestOptions.hostname + (createRequestOptions.port ? `:${createRequestOptions.port}` : "");

    // Update createRequestOptions with proxy host, port, protocol, and path
    const proxyHost = resolvedProxyConfig.hostname || resolvedProxyConfig.host;
    createRequestOptions.hostname = proxyHost;
    createRequestOptions.host = proxyHost;
    createRequestOptions.port = resolvedProxyConfig.port;
    createRequestOptions.path = requestUrl;

    // Ensure protocol ends with ':'
    if (resolvedProxyConfig.protocol) {
      createRequestOptions.protocol = resolvedProxyConfig.protocol.includes(":")
        ? resolvedProxyConfig.protocol
        : `${resolvedProxyConfig.protocol}:`;
    }
  }

  // Attach a beforeRedirects.proxy handler to re-apply proxy settings on redirects
  createRequestOptions.beforeRedirects.proxy = function handleProxyOnRedirect(redirectedOptions) {
    configureProxyForRequest(redirectedOptions, proxyConfig, redirectedOptions.href);
  };
}

module.exports = configureProxyForRequest;