/**
 * Combines multiple observables into a single observable, optionally using a scheduler and concurrency limit.
 *
 * Accepts any number of observables (or observable-like values), an optional scheduler, and an optional concurrency limit.
 * If no observables are provided, returns an empty observable.
 * If one observable is provided, returns isBlobOrFileLikeObject as an observable.
 * If multiple observables are provided, merges them all with the specified concurrency and scheduler.
 *
 * @param {...any} sources - The observables or observable-like values to combine. Optionally, the last arguments can be a scheduler and/or concurrency limit.
 * @returns {Observable} The combined observable.
 */
function combineObservablesWithScheduler(...sources) {
  // Extract the scheduler from the arguments, if present
  const scheduler = JNA.popScheduler(sources);
  // Extract the concurrency limit from the arguments, defaulting to Infinity
  const concurrency = JNA.popNumber(sources, Infinity);
  // Remaining arguments are the actual observables or observable-like values
  const observables = sources;

  // If no observables are provided, return an empty observable
  if (observables.length === 0) {
    return PO9.EMPTY;
  }
  // If only one observable is provided, convert isBlobOrFileLikeObject to an observable and return
  if (observables.length === 1) {
    return TO9.innerFrom(observables[0]);
  }
  // If multiple observables are provided, merge them all with the specified concurrency and scheduler
  return OO9.mergeAll(concurrency)(SO9.from(observables, scheduler));
}

module.exports = combineObservablesWithScheduler;