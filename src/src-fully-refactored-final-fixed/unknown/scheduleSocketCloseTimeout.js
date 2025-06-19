/**
 * Schedules a timeout to destroy the socket connection after a specified delay.
 *
 * @param {Object} socketManager - An object that manages the socket connection. Must have a `_socket` property (the socket instance) and a `_closeTimer` property.
 * @returns {void}
 *
 * The function sets a timer (30 seconds) to destroy the socket. The timer reference is stored in `socketManager._closeTimer` for potential future clearing.
 */
function scheduleSocketCloseTimeout(socketManager) {
  // Schedule the socket to be destroyed after 30 seconds (30000 ms)
  socketManager._closeTimer = setTimeout(
    socketManager._socket.destroy.bind(socketManager._socket),
    30000
  );
}

module.exports = scheduleSocketCloseTimeout;