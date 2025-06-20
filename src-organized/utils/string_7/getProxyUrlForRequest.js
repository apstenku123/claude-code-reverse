/**
 * Retrieves the appropriate proxy URL for a given network request configuration.
 *
 * @param {string|object} requestConfig - The request configuration, either as a URL string or an object with protocol, host, and port.
 * @returns {string} The proxy URL to use for the request, or an empty string if no valid proxy is found.
 */
function getProxyUrlForRequest(requestConfig) {
  // If the input is a string, parse isBlobOrFileLikeObject into an object; otherwise, use isBlobOrFileLikeObject as-is or default to an empty object
  const config = typeof requestConfig === "string" ? bV9(requestConfig) : requestConfig || {};
  const protocol = config.protocol;
  let host = config.host;
  let port = config.port;

  // Validate that protocol and host are non-empty strings
  if (typeof host !== "string" || !host || typeof protocol !== "string") {
    return "";
  }

  // Normalize protocol (remove anything after the first colon)
  const normalizedProtocol = protocol.split(":", 1)[0];
  // Remove any port from the host string (e.g., "example.com:8080" -> "example.com")
  host = host.replace(/:\d*$/, "");
  // Parse the port, or use the default for the protocol, or 0 if not found
  const normalizedPort = parseInt(port) || gV9[normalizedProtocol] || 0;

  // Validate the host and port using dV9 (returns false if invalid)
  if (!dV9(host, normalizedPort)) {
    return "";
  }

  // Try to get the proxy URL from environment variables, in order of specificity
  let proxyUrl = $x("npm_config_" + normalizedProtocol + "_proxy") ||
                 $x(normalizedProtocol + "_proxy") ||
                 $x("npm_config_proxy") ||
                 $x("all_proxy");

  // If a proxy URL is found but does not include a protocol, prepend isBlobOrFileLikeObject
  if (proxyUrl && proxyUrl.indexOf("://") === -1) {
    proxyUrl = normalizedProtocol + "://" + proxyUrl;
  }

  return proxyUrl;
}

module.exports = getProxyUrlForRequest;