/**
 * Merges multiple observables into a single observable, applying a custom scheduler.
 *
 * @param {...any} observables - The observables to be merged.
 * @returns {Observable} a single observable resulting from merging all input observables with the specified scheduler.
 */
function mergeAllWithScheduler(...observables) {
  // Create an observable from the input observables, using a custom scheduler
  const observableWithScheduler = kR9.from(observables, jR9.popScheduler(observables));
  // Merge all inner observables into a single observable
  return _R9.concatAll()(observableWithScheduler);
}

module.exports = mergeAllWithScheduler;