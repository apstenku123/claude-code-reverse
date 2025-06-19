/**
 * Extracts key connection details from a socket-like object.
 *
 * @param {Object} socket - The socket object containing connection properties.
 * @param {string} [socket.localAddress] - The local IP address of the socket.
 * @param {number} [socket.localPort] - The local port number of the socket.
 * @param {string} [socket.remoteAddress] - The remote IP address the socket is connected to.
 * @param {number} [socket.remotePort] - The remote port number the socket is connected to.
 * @param {string} [socket.remoteFamily] - The family of the remote address (e.g., 'IPv4', 'IPv6').
 * @param {number} [socket.timeout] - The socket timeout value in milliseconds.
 * @param {number} [socket.bytesWritten] - The number of bytes written to the socket.
 * @param {number} [socket.bytesRead] - The number of bytes read from the socket.
 * @returns {Object} An object containing selected connection details from the socket.
 */
function extractSocketConnectionDetails(socket) {
  // Return a new object with only the relevant connection properties
  return {
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
    timeout: socket.timeout,
    bytesWritten: socket.bytesWritten,
    bytesRead: socket.bytesRead
  };
}

module.exports = extractSocketConnectionDetails;
