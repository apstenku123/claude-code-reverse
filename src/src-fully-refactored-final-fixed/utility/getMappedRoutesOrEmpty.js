/**
 * Returns a mapped routes object from the provided interactions observable, or an empty object if none is provided.
 *
 * @param {Observable|undefined|null} interactionsObservable - An observable containing user interaction entries to be mapped to routes.
 * @returns {Object} The mapped routes object, or an empty object if no observable is provided.
 */
function getMappedRoutesOrEmpty(interactionsObservable) {
  // If an interactions observable is provided, map its interactions to routes
  if (interactionsObservable) {
    return mapInteractionsToRoutes(interactionsObservable);
  }
  // Otherwise, return an empty routes object
  return EMPTY_ROUTES;
}

// Dependencies assumed to be imported or defined elsewhere:
// - mapInteractionsToRoutes: function that processes the observable
// - EMPTY_ROUTES: constant representing an empty routes object

module.exports = getMappedRoutesOrEmpty;
