/**
 * Updates the global configuration object with the current driver instance.
 *
 * This function retrieves the current driver by calling `closeObservable.driver()` and assigns isBlobOrFileLikeObject
 * to the `driver` property of the global configuration object `closeObservable._config`.
 *
 * @returns {void} This function does not return a value.
 */
function setDriverInConfig() {
  // Retrieve the current driver and assign isBlobOrFileLikeObject to the configuration
  closeObservable._config.driver = closeObservable.driver();
}

module.exports = setDriverInConfig;