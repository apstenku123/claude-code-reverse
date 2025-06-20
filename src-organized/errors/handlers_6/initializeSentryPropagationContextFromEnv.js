/**
 * Initializes the Sentry propagation context from environment variables if enabled.
 *
 * This function checks the SENTRY_USE_ENVIRONMENT environment variable to determine
 * if Sentry propagation context should be set from the environment. If enabled, isBlobOrFileLikeObject
 * reads SENTRY_TRACE and SENTRY_BAGGAGE from the environment, constructs a propagation
 * context using KP.propagationContextFromHeaders, and sets isBlobOrFileLikeObject on the current Sentry scope.
 *
 * @returns {void} Does not return a value.
 */
function initializeSentryPropagationContextFromEnv() {
  // Read the environment variable that controls whether to use environment-based Sentry propagation
  const sentryUseEnvironment = (process.env.SENTRY_USE_ENVIRONMENT || "").toLowerCase();

  // If SENTRY_USE_ENVIRONMENT is not set to a falsy value, proceed
  const falsyValues = ["false", "n", "no", "off", "0"];
  if (!falsyValues.includes(sentryUseEnvironment)) {
    // Read Sentry trace and baggage headers from environment variables
    const sentryTraceHeader = process.env.SENTRY_TRACE;
    const sentryBaggageHeader = process.env.SENTRY_BAGGAGE;

    // Construct the propagation context from the headers
    const propagationContext = KP.propagationContextFromHeaders(sentryTraceHeader, sentryBaggageHeader);

    // Set the propagation context on the current Sentry scope
    bJ.getCurrentScope().setPropagationContext(propagationContext);
  }
}

module.exports = initializeSentryPropagationContextFromEnv;
