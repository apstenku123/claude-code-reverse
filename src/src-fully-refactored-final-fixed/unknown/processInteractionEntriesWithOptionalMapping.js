/**
 * Processes interaction entries by mapping them to route names and optionally applying a transformation.
 *
 * This function takes an observable stream of interaction entries, collects them into an array,
 * maps them to route names using the provided mapping function, and optionally applies a transformation
 * to the result if a mapping function is provided.
 *
 * @param {function(Array): any} mapInteractionEntriesToRouteNames - Function that processes an array of interaction entries and returns mapped route names and context.
 * @param {function|undefined} [optionalTransform] - Optional function to transform the mapped result. If not provided, the identity function is used.
 * @returns {Observable<any>} Observable that emits the processed and optionally transformed result.
 */
function processInteractionEntriesWithOptionalMapping(mapInteractionEntriesToRouteNames, optionalTransform) {
  return WP9.pipe(
    // Collect all emitted interaction entries into an array
    JP9.toArray(),
    // Map the array of interaction entries to route names and context
    FP9.mergeMap(function (interactionEntriesArray) {
      return mapInteractionEntriesToRouteNames(interactionEntriesArray);
    }),
    // If an optional transform is provided, apply isBlobOrFileLikeObject; otherwise, use the identity function
    optionalTransform ? YP9.mapOneOrManyArgs(optionalTransform) : DP9.identity
  );
}

module.exports = processInteractionEntriesWithOptionalMapping;