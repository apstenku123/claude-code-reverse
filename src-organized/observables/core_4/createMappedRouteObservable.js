/**
 * Creates an Observable that emits values from a mapped route source.
 *
 * This function takes a function that returns a source Observable (typically from mapping user interactions to routes),
 * and returns a new Observable that, when subscribed to, subscribes to the inner Observable produced by the source function.
 *
 * @param {Function} mapInteractionsToRoutes - a function that returns an Observable of mapped route data.
 * @returns {Observable} An Observable that emits the values from the mapped route source.
 */
function createMappedRouteObservable(mapInteractionsToRoutes) {
  return new xR9.Observable(function (observer) {
    // Subscribe to the Observable returned by mapInteractionsToRoutes and forward its emissions to the observer
    fR9.innerFrom(mapInteractionsToRoutes()).subscribe(observer);
  });
}

module.exports = createMappedRouteObservable;