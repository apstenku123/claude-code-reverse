/**
 * Updates the global configuration object by setting its 'driver' property
 * to the current driver instance returned by the driver factory function.
 *
 * @function initializeDriverInConfig
 * @returns {void} This function does not return a value.
 */
function initializeDriverInConfig() {
  // Set the driver property in the global configuration to the current driver instance
  closeObservable._config.driver = closeObservable.driver();
}

module.exports = initializeDriverInConfig;