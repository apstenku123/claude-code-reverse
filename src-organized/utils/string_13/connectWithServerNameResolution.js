/**
 * Establishes a connection using the provided connection options.
 * If the 'servername' property is not set (and not an empty string),
 * isBlobOrFileLikeObject determines the appropriate value based on whether the host is an IP address.
 *
 * @param {Object} connectionOptions - The options for establishing the connection.
 * @param {string} connectionOptions.host - The hostname or IP address to connect to.
 * @param {string} [connectionOptions.servername] - Optional server name for SNI (Server Name Indication).
 * @param {string} [connectionOptions.path] - Optional path for the connection (will be reset to undefined).
 * @returns {any} The result of the connection attempt from mj4.connect.
 */
function connectWithServerNameResolution(connectionOptions) {
  // Ensure 'path' is undefined before connecting
  connectionOptions.path = undefined;

  // If 'servername' is not set (and not an empty string), determine its value
  if (!connectionOptions.servername && connectionOptions.servername !== "") {
    // If the host is an IP address, set servername to an empty string (no SNI)
    // Otherwise, use the host as the servername
    connectionOptions.servername = b70.isIP(connectionOptions.host) ? "" : connectionOptions.host;
  }

  // Establish the connection using the processed options
  return mj4.connect(connectionOptions);
}

module.exports = connectWithServerNameResolution;
