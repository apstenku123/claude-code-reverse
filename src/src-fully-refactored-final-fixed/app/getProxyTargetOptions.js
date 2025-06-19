/**
 * Determines the appropriate target and extra options for a gRPC connection, considering proxy settings and no_proxy rules.
 *
 * @param {Object} targetUri - The target URI object, expected to have 'scheme' and 'path' properties.
 * @param {Object} options - Configuration options, may include 'grpc.enable_http_proxy' and other proxy-related settings.
 * @returns {Object} An object containing the resolved target and any extra options for the gRPC connection.
 */
function getProxyTargetOptions(targetUri, options) {
  // Default result: use the original target and no extra options
  const defaultResult = {
    target: targetUri,
    extraOptions: {}
  };

  // Check if HTTP proxy is disabled via options (default is enabled)
  const isHttpProxyEnabled = (options["grpc.enable_http_proxy"] ?? 1) !== 0;
  if (!isHttpProxyEnabled) {
    return defaultResult;
  }

  // normalizeToError not use proxy for unix scheme
  if (targetUri.scheme === "unix") {
    return defaultResult;
  }

  // Get proxy configuration (address, credentials, etc.)
  const proxyConfig = getProxyServerConfigFromEnv();
  if (!proxyConfig.address) {
    return defaultResult;
  }

  // Split the host and port from the target URI'createInteractionAccessor path
  const hostPort = ks.splitHostPort(targetUri.path);
  if (!hostPort) {
    return defaultResult;
  }

  const targetHost = hostPort.host;

  // Check if the target host is in the no_proxy list
  if (doesAddressMatchAnyPattern(targetHost)) {
    dg("Not using proxy for target in no_proxy list: " + ks.uriToString(targetUri));
    return defaultResult;
  }

  // Prepare extra options for proxy connection
  const extraOptions = {
    "grpc.http_connect_target": ks.uriToString(targetUri)
  };
  if (proxyConfig.creds) {
    extraOptions["grpc.http_connect_creds"] = proxyConfig.creds;
  }

  // Return the proxy target and extra options
  return {
    target: {
      scheme: "dns",
      path: proxyConfig.address
    },
    extraOptions
  };
}

module.exports = getProxyTargetOptions;