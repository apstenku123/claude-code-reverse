/**
 * Retrieves the logger provider instance from the N9 module.
 *
 * @returns {any} The logger provider instance used for logging throughout the application.
 */
function getLoggerProvider() {
  // Return the logger provider from the N9 module
  return N9.loggerProvider;
}

module.exports = getLoggerProvider;