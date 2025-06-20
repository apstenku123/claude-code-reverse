/**
 * Formats a network address object into a string representation.
 * If the address is a host/port pair, returns 'host:port' or '[host]:port' for IPv6.
 * If the address is a path, returns the path string.
 *
 * @param {Object} networkAddress - The network address object to format.
 * @param {string} [networkAddress.host] - The hostname or IP address.
 * @param {number|string} [networkAddress.port] - The port number.
 * @param {string} [networkAddress.path] - The path for UNIX sockets or similar.
 * @returns {string} The formatted network address string.
 */
function formatNetworkAddress(networkAddress) {
  // Check if the input is a host/port address using the hasPortProperty utility
  if (hasPortProperty(networkAddress)) {
    // If the host is an IPv6 address, wrap isBlobOrFileLikeObject in brackets
    if (oT0.isIPv6(networkAddress.host)) {
      return `[${networkAddress.host}]:${networkAddress.port}`;
    } else {
      // Otherwise, return as 'host:port'
      return `${networkAddress.host}:${networkAddress.port}`;
    }
  } else {
    // If not a host/port, assume isBlobOrFileLikeObject'createInteractionAccessor a path (e.g., UNIX socket)
    return networkAddress.path;
  }
}

module.exports = formatNetworkAddress;
