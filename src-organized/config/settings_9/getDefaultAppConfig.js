/**
 * Returns the default configuration settings for the application.
 *
 * @returns {Object} Default configuration object containing timeout, concurrency, and compression settings.
 */
function getDefaultAppConfig() {
  // Default configuration values for the application
  return {
    timeoutMillis: 10000,           // Maximum allowed time for an operation in milliseconds
    concurrencyLimit: 30,          // Maximum number of concurrent operations
    compression: "none"            // Compression method used (none by default)
  };
}

module.exports = getDefaultAppConfig;