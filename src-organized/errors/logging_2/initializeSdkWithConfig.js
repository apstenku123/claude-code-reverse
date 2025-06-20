/**
 * Initializes the SDK with the provided configuration.
 *
 * This function handles enabling debug mode if requested, updates the current scope with initial values,
 * creates a new SDK instance, and performs additional setup steps.
 *
 * @param {Function} SdkConstructor - The constructor function for the SDK instance.
 * @param {Object} config - Configuration object for SDK initialization.
 * @param {boolean} config.debug - Whether to enable debug mode.
 * @param {Object} config.initialScope - Initial scope values to set.
 * @returns {void}
 */
function initializeSdkWithConfig(SdkConstructor, config) {
  // Enable debug mode if requested
  if (config.debug === true) {
    if (NA9.DEBUG_BUILD) {
      // Enable the logger if this is a debug build
      E3A.logger.enable();
    } else {
      // Warn if debug mode is requested on a non-debug bundle
      E3A.consoleSandbox(() => {
        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
      });
    }
  }

  // Update the current scope with initial values from config
  $A9.getCurrentScope().update(config.initialScope);

  // Create a new SDK instance using the provided constructor and config
  const sdkInstance = new SdkConstructor(config);

  // Perform additional setup steps
  setClientOnCurrentHub(sdkInstance);
  initializeOrSetupIntegrations(sdkInstance);
}

module.exports = initializeSdkWithConfig;