/**
 * Attempts to establish a TCP connection to a specified host and port within a given timeout.
 *
 * @param {string} host - The hostname or IP address to connect to.
 * @param {number} port - The port number to connect to.
 * @param {number} [timeout=500] - The connection timeout in milliseconds.
 * @returns {Promise<boolean>} Resolves to true if the connection is successful, false otherwise.
 */
async function checkTcpConnectionWithTimeout(host, port, timeout = 500) {
  try {
    return new Promise((resolve) => {
      // Create a TCP connection using the BO6 function
      const socket = BO6({
        host: host,
        port: port,
        timeout: timeout
      });

      // On successful connection, destroy the socket and resolve true
      socket.on("connect", () => {
        socket.destroy();
        resolve(true);
      });

      // On error, resolve false
      socket.on("error", () => {
        resolve(false);
      });

      // On timeout, destroy the socket and resolve false
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

module.exports = checkTcpConnectionWithTimeout;
