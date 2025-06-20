/**
 * Factory function to create a new vM0 instance with the specified concurrency limit.
 *
 * @param {Object} options - Configuration options for the vM0 instance.
 * @param {number} options.concurrencyLimit - The maximum number of concurrent operations allowed.
 * @returns {vM0} a new instance of vM0 configured with the given concurrency limit.
 */
function createVM0(options) {
  // Instantiate and return a new vM0 with the provided concurrency limit
  return new vM0(options.concurrencyLimit);
}

module.exports = createVM0;