/**
 * Initializes the SDK instance with the provided configuration and sets up debugging if enabled.
 *
 * @param {Function} SdkConstructor - The constructor function/class for the SDK instance.
 * @param {Object} sdkConfig - Configuration object for SDK initialization.
 * @param {boolean} sdkConfig.debug - If true, enables debug logging for the SDK.
 * @param {Object} [sdkConfig.initialScope] - Optional initial scope to set on the SDK.
 * @returns {void}
 */
function initializeSdkInstance(SdkConstructor, sdkConfig) {
  // Enable debug logging if requested
  if (sdkConfig.debug === true) {
    if (NA9.DEBUG_BUILD) {
      // If in debug build, enable the logger
      E3A.logger.enable();
    } else {
      // If not in debug build, warn the user via a sandboxed console
      E3A.consoleSandbox(() => {
        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
      });
    }
  }

  // Update the current scope with the initial scope if provided
  $A9.getCurrentScope().update(sdkConfig.initialScope);

  // Create a new SDK instance with the provided configuration
  const sdkInstance = new SdkConstructor(sdkConfig);

  // Perform additional setup on the SDK instance
  setClientOnCurrentHub(sdkInstance);
  initializeOrSetupIntegrations(sdkInstance);
}

module.exports = initializeSdkInstance;