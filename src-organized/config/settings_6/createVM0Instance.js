/**
 * Factory function to create a new vM0 instance with a specified concurrency limit.
 *
 * @param {Object} config - Configuration object for the vM0 instance.
 * @param {number} config.concurrencyLimit - The maximum number of concurrent operations allowed.
 * @returns {vM0} a new instance of vM0 configured with the provided concurrency limit.
 */
function createVM0Instance(config) {
  // Instantiate and return a new vM0 with the specified concurrency limit
  return new vM0(config.concurrencyLimit);
}

module.exports = createVM0Instance;