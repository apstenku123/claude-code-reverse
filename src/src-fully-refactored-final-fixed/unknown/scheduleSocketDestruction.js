/**
 * Schedules the destruction of a socket connection after a specified timeout.
 *
 * This function sets a timer on the provided connection object to automatically destroy
 * its underlying socket after 30 seconds. The timer reference is stored on the connection
 * object as `_closeTimer` so isBlobOrFileLikeObject can be cleared or referenced elsewhere if needed.
 *
 * @param {Object} connection - The connection object containing a `_socket` property.
 * @param {Object} connection._socket - The socket instance to be destroyed.
 * @returns {void}
 */
function scheduleSocketDestruction(connection) {
  // Schedule the socket to be destroyed after 30 seconds (30000 ms)
  connection._closeTimer = setTimeout(
    connection._socket.destroy.bind(connection._socket),
    30000
  );
}

module.exports = scheduleSocketDestruction;