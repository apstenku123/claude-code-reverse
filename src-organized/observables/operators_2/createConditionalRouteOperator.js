/**
 * Creates an RxJS operator that conditionally applies routing logic to observables.
 *
 * If a configuration observable is provided, returns a function that, when given a source observable,
 * concatenates the configuration observable (taking only its first emission and ignoring its elements)
 * with the source observable piped through the route mapping operator.
 *
 * If no configuration observable is provided, returns a mergeMap operator that, for each emission from the source,
 * applies the route mapping function, takes only the first emission, and maps the result back to the original value.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Function that maps interaction entries to route names and context.
 * @param {Observable} [configObservable] - Optional configuration observable to prepend to the source observable.
 * @returns {Function|OperatorFunction} An RxJS operator function or a higher-order function depending on the presence of configObservable.
 */
function createConditionalRouteOperator(mapInteractionEntriesToRouteNames, configObservable) {
  if (configObservable) {
    // If a config observable is provided, return a function that takes a source observable
    // and concatenates the config observable (taking only its first emission and ignoring its elements)
    // with the source observable piped through the route mapping operator.
    return function (sourceObservable) {
      return ES9.concat(
        configObservable.pipe(
          r$a.take(1),
          US9.ignoreElements()
        ),
        sourceObservable.pipe(
          processSubLanguageHighlighting$a(mapInteractionEntriesToRouteNames)
        )
      );
    };
  }
  // If no config observable is provided, return a mergeMap operator
  // that maps each emission to the result of the route mapping function,
  // takes only the first emission, and maps the result back to the original value.
  return $S9.mergeMap(function (interactionEntry, index) {
    return qS9.innerFrom(
      mapInteractionEntriesToRouteNames(interactionEntry, index)
    ).pipe(
      r$a.take(1),
      NS9.mapTo(interactionEntry)
    );
  });
}

module.exports = createConditionalRouteOperator;