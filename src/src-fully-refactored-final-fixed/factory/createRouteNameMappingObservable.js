/**
 * Factory function that creates an observable for mapping user interactions to route names.
 *
 * This function instantiates a new wm1 observable, which processes an array of user interaction entries
 * and maps each entry to a route name and associated context (such as user, transaction, or replay).
 * The mapping ensures that the size does not exceed a set limit, and updates or evicts mappings based on duration.
 *
 * @param {Observable} sourceObservable - The observable stream of user interaction entries to be mapped.
 * @returns {wm1} An instance of wm1 that handles the mapping of interactions to route names.
 */
function createRouteNameMappingObservable(sourceObservable) {
  // Instantiate a new wm1 observable with the provided source observable
  return new wm1(sourceObservable);
}

module.exports = createRouteNameMappingObservable;