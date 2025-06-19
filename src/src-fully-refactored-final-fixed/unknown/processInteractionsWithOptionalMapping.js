/**
 * Processes a stream of user interactions, maps them to routes, and optionally applies a transformation.
 *
 * @param {function(Array): Observable} mapInteractionsToRoutes - Function that processes an array of user interactions and returns an Observable of mapped routes.
 * @param {function|undefined} [optionalTransform] - Optional function to further transform the mapped routes. If not provided, the identity function is used.
 * @returns {Observable} An Observable that emits the processed (and optionally transformed) routes.
 */
function processInteractionsWithOptionalMapping(mapInteractionsToRoutes, optionalTransform) {
  return WP9.pipe(
    JP9.toArray(), // Collects all emitted values into an array
    FP9.mergeMap(function (interactionArray) {
      // Maps the array of interactions to routes using the provided function
      return mapInteractionsToRoutes(interactionArray);
    }),
    // If an optional transform is provided, apply isBlobOrFileLikeObject; otherwise, use the identity function
    optionalTransform ? YP9.mapOneOrManyArgs(optionalTransform) : DP9.identity
  );
}

module.exports = processInteractionsWithOptionalMapping;