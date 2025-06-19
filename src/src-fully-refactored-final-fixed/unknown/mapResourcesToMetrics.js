/**
 * Maps an array of resource subscriptions to their corresponding resource metrics using a provided configuration.
 *
 * @param {Array<Object>} resourceSubscriptions - An array of resource subscription objects to be processed.
 * @param {Object} config - Configuration object used by the resource metrics mapping function.
 * @returns {Object} An object containing the mapped resource metrics array under the 'resourceMetrics' key.
 */
function mapResourcesToMetrics(resourceSubscriptions, config) {
  // Map each resource subscription to its resource metrics using the zR0 function and the provided config
  const resourceMetrics = resourceSubscriptions.map(subscription => zR0(subscription, config));

  return {
    resourceMetrics
  };
}

module.exports = mapResourcesToMetrics;