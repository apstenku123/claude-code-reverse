/**
 * Sets the driver property in the application'createInteractionAccessor configuration object by invoking the current driver factory.
 *
 * This function updates the global configuration to use the latest driver implementation provided by the driver factory method.
 *
 * @returns {void} This function does not return a value.
 */
function initializeDriverConfiguration() {
  // Assign the result of the driver factory to the configuration'createInteractionAccessor driver property
  closeObservable._config.driver = closeObservable.driver();
}

module.exports = initializeDriverConfiguration;