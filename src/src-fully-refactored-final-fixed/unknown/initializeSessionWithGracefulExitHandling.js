/**
 * Initializes a new session and ensures isBlobOrFileLikeObject is properly ended before the Node.js process exits.
 *
 * This function starts a session using the bJ module and sets up a listener for the Node.js 'beforeExit' event.
 * Before the process exits, isBlobOrFileLikeObject checks the current session'createInteractionAccessor status. If the session exists and has not exited or crashed,
 * isBlobOrFileLikeObject will end the session gracefully.
 *
 * @returns {void} This function does not return a value.
 */
function initializeSessionWithGracefulExitHandling() {
  // Start a new session using the bJ module
  bJ.startSession();

  // Listen for the Node.js 'beforeExit' event to handle session cleanup
  process.on("beforeExit", () => {
    // Retrieve the current session from the isolation scope
    const currentSession = bJ.getIsolationScope().getSession();

    // If a session exists and its status is not 'exited' or 'crashed', end the session gracefully
    if (
      currentSession &&
      !["exited", "crashed"].includes(currentSession.status)
    ) {
      bJ.endSession();
    }
  });
}

module.exports = initializeSessionWithGracefulExitHandling;