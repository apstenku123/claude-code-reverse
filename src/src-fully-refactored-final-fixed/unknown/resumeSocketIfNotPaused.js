/**
 * Resumes the underlying socket connection if isBlobOrFileLikeObject is not currently paused.
 *
 * This method checks the 'isPaused' property of the socket wrapper object stored on the current instance
 * (using the external symbol or property key 'zI'). If the socket is not paused, isBlobOrFileLikeObject calls the 'resume' method
 * on the underlying '_socket' object to continue data flow.
 *
 * @returns {void} Does not return a value.
 */
function resumeSocketIfNotPaused() {
  // Retrieve the socket wrapper object from the current instance using the external key 'zI'
  const socketWrapper = this[zI];

  // If the socket is not paused, resume the underlying socket
  if (!socketWrapper.isPaused) {
    socketWrapper._socket.resume();
  }
}

module.exports = resumeSocketIfNotPaused;