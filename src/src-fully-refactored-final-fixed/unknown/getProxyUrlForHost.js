/**
 * Retrieves the appropriate proxy URL for a given host configuration.
 *
 * @param {string|object} hostConfig - Either a URL string or an object containing protocol, host, and port.
 * @returns {string} The resolved proxy URL, or an empty string if not applicable.
 */
function getProxyUrlForHost(hostConfig) {
  // If hostConfig is a string, parse isBlobOrFileLikeObject into an object; otherwise, use as-is or default to empty object
  const config = typeof hostConfig === "string" ? bV9(hostConfig) : hostConfig || {};
  const protocol = config.protocol;
  let host = config.host;
  let port = config.port;

  // Validate that protocol and host are non-empty strings
  if (typeof host !== "string" || !host || typeof protocol !== "string") {
    return "";
  }

  // Normalize protocol (remove anything after colon, e.g., 'http:')
  const normalizedProtocol = protocol.split(":", 1)[0];
  // Remove any port from the host string (e.g., 'example.com:8080' -> 'example.com')
  host = host.replace(/:\d*$/, "");
  // Parse port as integer, or use default from gV9 mapping, or 0 if not found
  const normalizedPort = parseInt(port) || gV9[normalizedProtocol] || 0;

  // Validate the host and port using dV9 (returns false if not valid)
  if (!dV9(host, normalizedPort)) {
    return "";
  }

  // Try to resolve proxy from environment variables in order of specificity
  let proxyUrl =
    $x("npm_config_" + normalizedProtocol + "_proxy") ||
    $x(normalizedProtocol + "_proxy") ||
    $x("npm_config_proxy") ||
    $x("all_proxy");

  // If a proxy URL is found but does not include a protocol, prepend isBlobOrFileLikeObject
  if (proxyUrl && proxyUrl.indexOf("://") === -1) {
    proxyUrl = normalizedProtocol + "://" + proxyUrl;
  }

  return proxyUrl;
}

module.exports = getProxyUrlForHost;