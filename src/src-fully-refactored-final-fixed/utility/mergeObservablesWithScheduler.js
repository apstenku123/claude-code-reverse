/**
 * Merges multiple observables into a single observable, using a specified scheduler.
 *
 * @param {...any} observables - The observables to merge together.
 * @returns {Observable} a single observable that emits all values from the input observables, scheduled by the popScheduler.
 */
function mergeObservablesWithScheduler(...observables) {
  // Get the scheduler to use for merging from the provided observables
  const scheduler = jR9.popScheduler(observables);
  // Create an observable from the input observables using the scheduler
  const mergedObservable = kR9.from(observables, scheduler);
  // Use concatAll to flatten the merged observable into a single observable sequence
  return _R9.concatAll()(mergedObservable);
}

module.exports = mergeObservablesWithScheduler;