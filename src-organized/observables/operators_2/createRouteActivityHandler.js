/**
 * Handles the mapping of user interactions to routes and manages activity completion logic.
 *
 * If an activity completion handler is provided, returns a function that, when called with a source observable,
 * will concatenate the completion handler (taking only the first emission and ignoring further elements) with the source observable
 * processed through the route mapping logic.
 *
 * If no activity completion handler is provided, returns a mergeMap operator that maps each emission from the source observable
 * to the route mapping logic, taking only the first emission and mapping the result back to the original value.
 *
 * @param {function} mapInteractionsToRoutes - Function that processes user interactions and maps them to routes.
 * @param {object} [addActivityIfNotFinished] - Optional handler to add activity if not finished; if provided, modifies the returned function'createInteractionAccessor behavior.
 * @returns {function} Either a function that processes an observable or an RxJS operator function (mergeMap).
 */
function createRouteActivityHandler(mapInteractionsToRoutes, addActivityIfNotFinished) {
  if (addActivityIfNotFinished) {
    // If an activity completion handler is provided, return a function that processes the source observable
    return function handleActivityCompletion(sourceObservable) {
      // Concatenate the completion handler (taking only the first emission and ignoring further elements)
      // with the source observable processed through the route mapping logic
      return ES9.concat(
        addActivityIfNotFinished.pipe(
          r$a.take(1),
          US9.ignoreElements()
        ),
        sourceObservable.pipe(
          createRouteActivityHandler(mapInteractionsToRoutes)
        )
      );
    };
  }

  // If no activity completion handler is provided, return a mergeMap operator
  return $S9.mergeMap(function processInteractionEntry(interactionEntry, index) {
    // Map the interaction entry to a route, take only the first emission, and map back to the original entry
    return qS9.innerFrom(mapInteractionsToRoutes(interactionEntry, index)).pipe(
      r$a.take(1),
      NS9.mapTo(interactionEntry)
    );
  });
}

module.exports = createRouteActivityHandler;