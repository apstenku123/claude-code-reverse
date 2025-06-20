/**
 * Establishes a connection using the provided configuration object.
 * Copies the 'socketPath' property to 'path' to ensure compatibility with the connection method.
 *
 * @param {Object} connectionConfig - Configuration object for the connection.
 * @param {string} connectionConfig.socketPath - The path to the socket for the connection.
 * @returns {any} The result of the b70.connect method, which establishes the connection.
 */
function connectWithSocketPath(connectionConfig) {
  // Ensure the 'path' property is set for compatibility with b70.connect
  connectionConfig.path = connectionConfig.socketPath;
  // Establish and return the connection
  return b70.connect(connectionConfig);
}

module.exports = connectWithSocketPath;
