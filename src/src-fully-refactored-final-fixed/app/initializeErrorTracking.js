/**
 * Initializes the error tracking and monitoring service (e.g., Sentry) for the application.
 *
 * This function configures the monitoring client with the appropriate DSN, environment,
 * release version, and integrations for HTTP tracing, module tracking, console logging,
 * function-to-string mapping, and linked error tracking. It also sets the trace sample rate
 * and specifies trace propagation targets.
 *
 * @function initializeErrorTracking
 * @returns {void} Does not return a value.
 */
function initializeErrorTracking() {
  // Initialize the monitoring client with the required configuration
  vY.init({
    // Data Source Name (DSN) for the monitoring service
    dsn: YWA,
    // Set the environment to 'external' for clarity
    environment: "external",
    // Specify the release version for tracking
    release: "1.0.19",
    // Add integrations for enhanced monitoring and error tracking
    integrations: [
      // HTTP integration with tracing enabled
      new vY.Integrations.Http({ tracing: true }),
      // Module tracking integration
      new vY.Integrations.Modules(),
      // Console logging integration
      new vY.Integrations.Console(),
      // Function-to-string mapping integration
      new vY.Integrations.FunctionToString(),
      // Linked errors integration for better error context
      new vY.Integrations.LinkedErrors()
    ],
    // Set the sample rate for tracing to 100%
    tracesSampleRate: 1,
    // Specify which targets should have trace propagation
    tracePropagationTargets: ["localhost"]
  });
}

module.exports = initializeErrorTracking;