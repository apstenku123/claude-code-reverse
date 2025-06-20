/**
 * Maps an observable of user interactions to an array of route mappings.
 *
 * If the provided observable is null or undefined, returns an empty array.
 * Otherwise, processes the observable using T4A and _J helpers to map interactions to routes.
 *
 * @param {Observable} interactionsObservable - Observable stream of user interaction entries.
 * @returns {Array} Array of mapped route objects or an empty array if input is null/undefined.
 */
function mapInteractionsToRoutesArray(interactionsObservable) {
  // Return an empty array if the input observable is null or undefined
  if (interactionsObservable == null) {
    return [];
  }

  // Process the observable using T4A and _J helpers
  // _J likely prepares or transforms the observable
  // T4A maps the transformed observable to route objects
  return T4A(interactionsObservable, _J(interactionsObservable));
}

module.exports = mapInteractionsToRoutesArray;