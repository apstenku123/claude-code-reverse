/**
 * Collects and returns route interaction data as an array.
 *
 * @param {Observable} sourceObservable - The observable containing interaction entries to be mapped to route names.
 * @param {Object} config - Configuration object for mapping or processing interactions.
 * @param {Subscription} subscription - The subscription instance related to the interaction processing.
 * @returns {Array} An array containing the source observable, configuration, and subscription.
 */
function collectRouteInteractionData(sourceObservable, config, subscription) {
  // Return all relevant interaction data as an array
  return [sourceObservable, config, subscription];
}

module.exports = collectRouteInteractionData;
