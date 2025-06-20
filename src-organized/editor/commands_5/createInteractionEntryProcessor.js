/**
 * Factory function to create a new instance of the interaction entry processor.
 *
 * @param {Object} options - Configuration options for the processor.
 * @param {number} options.concurrencyLimit - The maximum number of concurrent interactions to process.
 * @returns {vM0} a new instance of the interaction entry processor with the specified concurrency limit.
 */
function createInteractionEntryProcessor(options) {
  // Create and return a new processor instance with the given concurrency limit
  return new vM0(options.concurrencyLimit);
}

module.exports = createInteractionEntryProcessor;