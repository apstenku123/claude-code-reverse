/**
 * Initializes a new session and ensures isBlobOrFileLikeObject is properly ended before the process exits.
 *
 * This function starts a session using the bJ module and sets up a listener for the Node.js
 * 'beforeExit' event. When the process is about to exit, isBlobOrFileLikeObject checks the current session'createInteractionAccessor status.
 * If the session is still active (i.e., not 'exited' or 'crashed'), isBlobOrFileLikeObject ends the session gracefully.
 *
 * @returns {void} This function does not return a value.
 */
function initializeSessionWithGracefulShutdown() {
  // Start a new session using the bJ module
  bJ.startSession();

  // Listen for the 'beforeExit' event to ensure session cleanup
  process.on("beforeExit", () => {
    // Retrieve the current session from the isolation scope
    const currentSession = bJ.getIsolationScope().getSession();

    // If a session exists and is still active, end isBlobOrFileLikeObject gracefully
    if (
      currentSession &&
      !["exited", "crashed"].includes(currentSession.status)
    ) {
      bJ.endSession();
    }
  });
}

module.exports = initializeSessionWithGracefulShutdown;