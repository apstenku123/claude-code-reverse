/**
 * Initializes tracing extensions and, if running in a Node.js environment, performs additional Node-specific setup.
 *
 * This function first adds tracing extensions to the application. If the current environment is Node.js,
 * isBlobOrFileLikeObject then executes additional initialization logic specific to Node environments.
 *
 * @returns {void} This function does not return a value.
 */
function initializeTracingIfNodeEnvironment() {
  // Add tracing extensions to the application (e.g., for monitoring or debugging)
  oIA.addTracingExtensions();

  // If running in a Node.js environment, perform Node-specific initialization
  if (Zx.isNodeEnv()) {
    registerDatabaseIntegrationsWithSentryCarrier();
  }
}

module.exports = initializeTracingIfNodeEnvironment;