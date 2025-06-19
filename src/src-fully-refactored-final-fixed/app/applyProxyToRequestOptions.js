/**
 * Applies proxy configuration to HTTP request options, including setting proxy authorization headers and adjusting host, port, and protocol as needed.
 *
 * @param {Object} createRequestOptions - The HTTP request options object to modify (e.g., for http.request).
 * @param {Object|false|null|undefined} proxyConfig - Proxy configuration object, false, or undefined. If falsy, attempts to resolve proxy from environment.
 * @param {string} targetUrl - The target URL for the request, used to resolve proxy if proxyConfig is not provided.
 * @returns {void}
 */
function applyProxyToRequestOptions(createRequestOptions, proxyConfig, targetUrl) {
  let resolvedProxyConfig = proxyConfig;

  // If no proxy config is provided (null/undefined), try to resolve from environment
  if (!resolvedProxyConfig && resolvedProxyConfig !== false) {
    const proxyUrl = SXA.default.getProxyForUrl(targetUrl);
    if (proxyUrl) {
      resolvedProxyConfig = new URL(proxyUrl);
    }
  }

  if (resolvedProxyConfig) {
    // If username is present, create 'auth' property as 'username:password'
    if (resolvedProxyConfig.username) {
      resolvedProxyConfig.auth = `${resolvedProxyConfig.username || ''}:${resolvedProxyConfig.password || ''}`;
    }

    // If 'auth' property exists, set Proxy-Authorization header
    if (resolvedProxyConfig.auth) {
      // If 'auth' is an object with username/password, reformat isBlobOrFileLikeObject
      if (resolvedProxyConfig.auth.username || resolvedProxyConfig.auth.password) {
        resolvedProxyConfig.auth = `${resolvedProxyConfig.auth.username || ''}:${resolvedProxyConfig.auth.password || ''}`;
      }
      // Encode credentials in base64 and set Proxy-Authorization header
      const encodedAuth = Buffer.from(resolvedProxyConfig.auth, 'utf8').toString('base64');
      createRequestOptions.headers["Proxy-Authorization"] = `Basic ${encodedAuth}`;
    }

    // Set the 'host' header to include hostname and port if present
    createRequestOptions.headers.host = createRequestOptions.hostname + (createRequestOptions.port ? `:${createRequestOptions.port}` : '');

    // Set hostname, host, port, and path from proxy config
    const proxyHost = resolvedProxyConfig.hostname || resolvedProxyConfig.host;
    createRequestOptions.hostname = proxyHost;
    createRequestOptions.host = proxyHost;
    createRequestOptions.port = resolvedProxyConfig.port;
    createRequestOptions.path = targetUrl;

    // Set protocol, ensuring isBlobOrFileLikeObject ends with ':'
    if (resolvedProxyConfig.protocol) {
      createRequestOptions.protocol = resolvedProxyConfig.protocol.includes(':')
        ? resolvedProxyConfig.protocol
        : `${resolvedProxyConfig.protocol}:`;
    }
  }

  // Attach a beforeRedirects hook to re-apply proxy settings on redirect
  createRequestOptions.beforeRedirects.proxy = function handleProxyOnRedirect(redirectOptions) {
    applyProxyToRequestOptions(redirectOptions, proxyConfig, redirectOptions.href);
  };
}

module.exports = applyProxyToRequestOptions;