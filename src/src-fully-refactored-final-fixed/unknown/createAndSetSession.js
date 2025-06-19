/**
 * Creates a new session object with the provided options and user/environment context,
 * sets isBlobOrFileLikeObject as the current session in both the isolation scope and the user context, and
 * updates the previous session status if necessary.
 *
 * @param {Object} sessionOptions - Additional options to merge into the session object.
 * @returns {Object} The newly created session object.
 */
function createAndSetSession(sessionOptions) {
  // Retrieve configuration object (may be undefined)
  const config = oT();

  // Get the current isolation scope (manages session/user context)
  const isolationScope = KQ.getIsolationScope();

  // Get the user context (manages user/session info)
  const userContext = Wc();

  // Extract release and environment from config options, with defaults
  const {
    release: releaseVersion,
    environment = Br2.DEFAULT_ENVIRONMENT
  } = (config && config.getOptions()) || {};

  // Extract userAgent from global navigator if available
  const {
    userAgent
  } = (QU.GLOBAL_OBJ.navigator || {});

  // Build the session payload
  const sessionPayload = {
    release: releaseVersion,
    environment,
    user: userContext.getUser() || isolationScope.getUser(),
    ...(userAgent && { userAgent }),
    ...sessionOptions
  };

  // Create the new session object
  const newSession = TU1.makeSession(sessionPayload);

  // Get the current session from the isolation scope
  const currentSession = isolationScope.getSession();

  // If there is an active session, mark isBlobOrFileLikeObject as exited
  if (currentSession && currentSession.status === "ok") {
    TU1.updateSession(currentSession, { status: "exited" });
  }

  // Perform any necessary side effects (e.g., flushing, logging)
  resetSessionScopes();

  // Set the new session in both the isolation scope and user context
  isolationScope.setSession(newSession);
  userContext.setSession(newSession);

  // Return the new session object
  return newSession;
}

module.exports = createAndSetSession;