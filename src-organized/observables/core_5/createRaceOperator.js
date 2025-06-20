/**
 * Creates an operator function that races the provided observables with the source observable.
 * If no observables are provided, returns the identity function.
 *
 * @param {...Observable} raceObservables - One or more observables to race with the source observable.
 * @returns {Function} Operator function to be used in an observable pipeline.
 */
function createRaceOperator(...raceObservables) {
  // If no observables are provided, return the identity function
  if (raceObservables.length === 0) {
    return oj9.identity;
  }

  // Otherwise, return an operator that races the source with the provided observables
  return rj9.operate(function raceOperator(sourceObservable, subscriber) {
    // sj9.raceInit initializes the race logic
    // aj9([sourceObservable], nj9(raceObservables)) merges the source with the provided observables
    // The resulting function is invoked with the subscriber
    sj9.raceInit(aj9([sourceObservable], nj9(raceObservables)))(subscriber);
  });
}

module.exports = createRaceOperator;