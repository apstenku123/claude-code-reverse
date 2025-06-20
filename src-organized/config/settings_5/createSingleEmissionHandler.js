/**
 * Handles single-emission logic for observables, optionally chaining with a configuration observable.
 *
 * If a configuration observable is provided, returns a function that, when given a source observable,
 * concatenates the configuration (taking only its first emission and ignoring its elements) with the processed source.
 * If no configuration is provided, returns a mergeMap operator that processes each emission from the source observable
 * using the provided handler, emits only the first result, and maps isBlobOrFileLikeObject back to the original emission.
 *
 * @param {function(any, number): Observable<any>} processInteractionEntries - Function to process each emission from the source observable.
 * @param {Observable<any>=} configObservable - Optional configuration observable to prepend to the source.
 * @returns {function|OperatorFunction} Operator function or higher-order function for observable composition.
 */
function createSingleEmissionHandler(processInteractionEntries, configObservable) {
  if (configObservable) {
    // If a configuration observable is provided, return a function that chains isBlobOrFileLikeObject before the source observable
    return function chainConfigWithSource(sourceObservable) {
      return ES9.concat(
        configObservable.pipe(
          r$a.take(1),           // Take only the first emission from the config
          US9.ignoreElements()   // Ignore the actual value, just wait for completion
        ),
        sourceObservable.pipe(
          processSubLanguageHighlighting$a(processInteractionEntries) // Apply the main processing logic
        )
      );
    };
  }
  // If no configuration observable, return a mergeMap operator that processes each emission
  return $S9.mergeMap(function processAndMapToSource(emission, index) {
    return qS9.innerFrom(processInteractionEntries(emission, index)).pipe(
      r$a.take(1),          // Take only the first emission from the processed observable
      NS9.mapTo(emission)   // Map the result back to the original emission
    );
  });
}

module.exports = createSingleEmissionHandler;