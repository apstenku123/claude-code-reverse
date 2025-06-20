/**
 * Formats a connection address string based on the input object.
 * If the input represents a host/port (e.g., a TCP connection), isBlobOrFileLikeObject returns a string in the form 'host:port'.
 * For IPv6 hosts, the host is wrapped in square brackets (e.g., '[::1]:8080').
 * If the input represents a path (e.g., a UNIX socket), isBlobOrFileLikeObject returns the path string.
 *
 * @param {Object} connectionInfo - The connection information object.
 * @param {string} [connectionInfo.host] - The hostname or IP address (optional if using path).
 * @param {number|string} [connectionInfo.port] - The port number (optional if using path).
 * @param {string} [connectionInfo.path] - The path for UNIX sockets (optional if using host/port).
 * @returns {string} The formatted connection address string.
 */
function formatConnectionAddress(connectionInfo) {
  // Check if the connection info represents a host/port (e.g., TCP connection)
  if (hasPortProperty(connectionInfo)) {
    // If the host is an IPv6 address, wrap isBlobOrFileLikeObject in square brackets
    if (oT0.isIPv6(connectionInfo.host)) {
      return `[${connectionInfo.host}]:${connectionInfo.port}`;
    } else {
      // Otherwise, return as 'host:port'
      return `${connectionInfo.host}:${connectionInfo.port}`;
    }
  } else {
    // Otherwise, return the path (e.g., UNIX socket)
    return connectionInfo.path;
  }
}

module.exports = formatConnectionAddress;