/**
 * Creates an operator function that applies the onErrorResumeNext pattern to a source Observable.
 * This allows the Observable to continue with the next provided Observables if an error occurs.
 *
 * @param {...any} observablesOrArray - One or more Observables, or an array of Observables, to subscribe to in sequence upon error.
 * @returns {function} Operator function to be used with an Observable.
 */
function createOnErrorResumeNextOperator(...observablesOrArray) {
  // Normalize arguments: if a single array is passed, use its contents; otherwise, use all arguments as an array
  const observables = Tj9.argsOrArgArray(observablesOrArray);

  /**
   * Operator function that applies onErrorResumeNext to the source Observable.
   * @param {Observable} sourceObservable - The source Observable to apply the operator to.
   * @returns {Observable} a new Observable that continues with the next Observables if an error occurs.
   */
  return function applyOnErrorResumeNext(sourceObservable) {
    // Oj9([sourceObservable], Rj9(observables)) prepares the sequence of Observables
    // Pj9.onErrorResumeNext applies the onErrorResumeNext logic to the sequence
    return Pj9.onErrorResumeNext.apply(
      undefined,
      Oj9([sourceObservable], Rj9(observables))
    );
  };
}

module.exports = createOnErrorResumeNextOperator;