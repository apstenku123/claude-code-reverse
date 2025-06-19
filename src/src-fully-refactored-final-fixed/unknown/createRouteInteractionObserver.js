/**
 * Creates a new RouteInteractionObserver instance to monitor route interactions.
 *
 * @param {Observable} sourceObservable - The observable stream of interaction entries to be mapped to route names.
 * @param {Object} config - Configuration options for the observer, including mapping and deduplication settings.
 * @returns {RouteInteractionObserver} An instance that observes and processes route interaction entries.
 */
function createRouteInteractionObserver(sourceObservable, config) {
  // Instantiate a new RouteInteractionObserver with the provided observable and configuration
  return new $V6(sourceObservable, config);
}

module.exports = createRouteInteractionObserver;
