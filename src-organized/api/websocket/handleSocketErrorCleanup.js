/**
 * Handles cleanup when a socket error event occurs.
 * Removes the current error listener, attaches a generic error handler,
 * and if the socket is in a valid state, marks isBlobOrFileLikeObject as closing and destroys isBlobOrFileLikeObject.
 *
 * @returns {void} No return value.
 */
function handleSocketErrorCleanup() {
  // Retrieve the underlying socket or stream object using the external property key
  const socket = this[zI];

  // Remove the specific error listener (originally handleSocketErrorCleanup)
  this.removeListener("error", handleSocketErrorCleanup);

  // Attach a generic error handler (originally g70)
  this.on("error", g70);

  // If the socket exists, mark isBlobOrFileLikeObject as closing and destroy isBlobOrFileLikeObject
  if (socket) {
    socket._readyState = O4.CLOSING;
    this.destroy();
  }
}

module.exports = handleSocketErrorCleanup;