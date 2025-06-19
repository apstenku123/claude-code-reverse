/**
 * Formats a host and port into a standardized string representation.
 *
 * If the port is undefined, returns the host as-is.
 * If the host contains a colon (':'), wraps the host in square brackets and appends the port (e.g., '[host]:port').
 * Otherwise, returns the host and port separated by a colon (e.g., 'host:port').
 *
 * @param {Object} addressInfo - An object containing host and port information.
 * @param {string} addressInfo.host - The hostname or IP address.
 * @param {number|string|undefined} addressInfo.port - The port number (optional).
 * @returns {string} The formatted host and port string.
 */
function formatHostWithPort(addressInfo) {
  // If port is not defined, return host as-is
  if (addressInfo.port === undefined) {
    return addressInfo.host;
  }
  // If host contains a colon, wrap in brackets to avoid ambiguity (e.g., IPv6)
  if (addressInfo.host.includes(":")) {
    return `[${addressInfo.host}]:${addressInfo.port}`;
  }
  // Otherwise, return host:port
  return `${addressInfo.host}:${addressInfo.port}`;
}

module.exports = formatHostWithPort;
