/**
 * Combines multiple observables provided as arguments into a single observable sequence,
 * using a scheduler determined by the arguments. The resulting observable emits all values
 * from each input observable in order, one after the other (concatenation).
 *
 * @param {...any} observables - The input observables or values to be concatenated.
 * @returns {Observable} An observable that emits all values from the input observables in sequence.
 */
function concatAllFromArgsWithScheduler(...observables) {
  // Use jR9.popScheduler to determine the scheduler from the arguments
  const scheduler = jR9.popScheduler(observables);

  // Create an observable from the input arguments using the determined scheduler
  const sourceObservable = kR9.from(observables, scheduler);

  // Apply concatAll to flatten the observable of observables into a single observable sequence
  return _R9.concatAll()(sourceObservable);
}

module.exports = concatAllFromArgsWithScheduler;