/**
 * Extracts key connection properties from a socket-like object.
 *
 * @param {Object} socketConnection - An object representing a network socket connection.
 * @param {string} socketConnection.localAddress - The local IP address of the socket.
 * @param {number} socketConnection.localPort - The local port number of the socket.
 * @param {string} socketConnection.remoteAddress - The remote IP address of the socket.
 * @param {number} socketConnection.remotePort - The remote port number of the socket.
 * @param {string} socketConnection.remoteFamily - The remote address family (e.g., 'IPv4', 'IPv6').
 * @param {number} socketConnection.timeout - The socket timeout value in milliseconds.
 * @param {number} socketConnection.bytesWritten - The total number of bytes written to the socket.
 * @param {number} socketConnection.bytesRead - The total number of bytes read from the socket.
 * @returns {Object} An object containing the extracted connection properties.
 */
function extractSocketConnectionInfo(socketConnection) {
  // Return a new object with only the relevant connection properties
  return {
    localAddress: socketConnection.localAddress,
    localPort: socketConnection.localPort,
    remoteAddress: socketConnection.remoteAddress,
    remotePort: socketConnection.remotePort,
    remoteFamily: socketConnection.remoteFamily,
    timeout: socketConnection.timeout,
    bytesWritten: socketConnection.bytesWritten,
    bytesRead: socketConnection.bytesRead
  };
}

module.exports = extractSocketConnectionInfo;
