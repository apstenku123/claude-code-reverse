/**
 * Factory function to create a new instance of the interaction-to-route mapper.
 *
 * @param {Object} config - Configuration object for the mapper.
 * @param {number} config.concurrencyLimit - The maximum number of concurrent mappings allowed.
 * @returns {vM0} a new instance of the interaction-to-route mapper with the specified concurrency limit.
 */
function createInteractionRouteMapper(config) {
  // Instantiate the interaction-to-route mapper with the provided concurrency limit
  return new vM0(config.concurrencyLimit);
}

module.exports = createInteractionRouteMapper;