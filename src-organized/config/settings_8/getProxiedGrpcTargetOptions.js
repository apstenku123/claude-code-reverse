/**
 * Determines whether to use an HTTP proxy for a given gRPC target and returns the appropriate target and options.
 *
 * @param {Object} targetUri - The gRPC target URI object. Should have at least 'scheme' and 'path' properties.
 * @param {Object} options - Configuration options, may include 'grpc.enable_http_proxy'.
 * @returns {Object} An object with 'target' (the resolved target URI) and 'extraOptions' (proxy-related options if applicable).
 */
function getProxiedGrpcTargetOptions(targetUri, options) {
  // Default result: no proxy, just return the original target
  const defaultResult = {
    target: targetUri,
    extraOptions: {}
  };

  // Check if HTTP proxy is disabled via options (default enabled)
  const isHttpProxyEnabled = (options["grpc.enable_http_proxy"] !== null && options["grpc.enable_http_proxy"] !== undefined)
    ? options["grpc.enable_http_proxy"]
    : 1;
  if (isHttpProxyEnabled === 0) return defaultResult;

  // normalizeToError not proxy unix domain sockets
  if (targetUri.scheme === "unix") return defaultResult;

  // Get proxy configuration (address, credentials, etc.)
  const proxyConfig = getProxyServerConfigFromEnv();
  if (!proxyConfig.address) return defaultResult;

  // Split the target URI into host and port
  const hostPort = ks.splitHostPort(targetUri.path);
  if (!hostPort) return defaultResult;
  const targetHost = hostPort.host;

  // Check if the target host is in the no_proxy list
  if (doesAddressMatchAnyPattern(targetHost)) {
    dg("Not using proxy for target in no_proxy list: " + ks.uriToString(targetUri));
    return defaultResult;
  }

  // Prepare extra options for proxy connection
  const proxyOptions = {
    "grpc.http_connect_target": ks.uriToString(targetUri)
  };
  if (proxyConfig.creds) {
    proxyOptions["grpc.http_connect_creds"] = proxyConfig.creds;
  }

  // Return the proxied target and options
  return {
    target: {
      scheme: "dns",
      path: proxyConfig.address
    },
    extraOptions: proxyOptions
  };
}

module.exports = getProxiedGrpcTargetOptions;