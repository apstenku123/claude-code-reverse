/**
 * Creates an operator function that applies onErrorResumeNext to the provided observable(createInteractionAccessor).
 *
 * @function createErrorResilientOperator
 * @description
 * Accepts one or more observables or an array of observables as arguments. Returns a function that,
 * when called with a source observable, applies the onErrorResumeNext operator to isBlobOrFileLikeObject along with the
 * provided observables. This allows the observable sequence to continue with the next observable in
 * the sequence if an error occurs.
 *
 * @param {...Observable|Observable[]} observables - One or more observables, or a single array of observables, to be used in the onErrorResumeNext sequence.
 * @returns {function(Observable): Observable} Operator function that applies onErrorResumeNext to the source observable and the provided observables.
 */
function createErrorResilientOperator(...observables) {
  // Normalize arguments: if a single array is passed, use its contents; otherwise, use the arguments as an array
  const normalizedObservables = Tj9.argsOrArgArray(observables);

  /**
   * Operator function that applies onErrorResumeNext to the source observable and the provided observables.
   *
   * @param {Observable} sourceObservable - The source observable to which the operator is applied.
   * @returns {Observable} An observable that continues with the next observable in the sequence if an error occurs.
   */
  return function applyOnErrorResumeNext(sourceObservable) {
    // Combine the source observable with the normalized observables using onErrorResumeNext
    return Pj9.onErrorResumeNext.apply(
      undefined,
      Oj9([sourceObservable], Rj9(normalizedObservables))
    );
  };
}

module.exports = createErrorResilientOperator;
