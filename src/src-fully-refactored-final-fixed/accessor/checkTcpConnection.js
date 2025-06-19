/**
 * Attempts to establish a TCP connection to a specified host and port within a given timeout.
 *
 * @async
 * @function checkTcpConnection
 * @param {string} host - The hostname or IP address to connect to.
 * @param {number} port - The port number to connect to.
 * @param {number} [timeout=500] - The connection timeout in milliseconds.
 * @returns {Promise<boolean>} Resolves to true if the connection is successful, false otherwise.
 */
async function checkTcpConnection(host, port, timeout = 500) {
  try {
    return new Promise((resolve) => {
      // Create a new TCP connection using the BO6 function (likely a socket creator)
      const socket = BO6({
        host: host,
        port: port,
        timeout: timeout
      });

      // If the connection is successful, destroy the socket and resolve true
      socket.on("connect", () => {
        socket.destroy();
        resolve(true);
      });

      // If there is an error, resolve false
      socket.on("error", () => {
        resolve(false);
      });

      // If the connection times out, destroy the socket and resolve false
      socket.on("timeout", () => {
        socket.destroy();
        resolve(false);
      });
    });
  } catch (error) {
    // In case of unexpected errors, return false
    return false;
  }
}

module.exports = checkTcpConnection;
