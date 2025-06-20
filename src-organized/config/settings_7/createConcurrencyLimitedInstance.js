/**
 * Factory function to create a new instance of vM0 with a specified concurrency limit.
 *
 * @param {Object} config - Configuration object containing concurrency settings.
 * @param {number} config.concurrencyLimit - The maximum number of concurrent operations allowed.
 * @returns {vM0} a new instance of vM0 configured with the provided concurrency limit.
 */
function createConcurrencyLimitedInstance(config) {
  // Create and return a new vM0 instance using the concurrency limit from the config
  return new vM0(config.concurrencyLimit);
}

module.exports = createConcurrencyLimitedInstance;