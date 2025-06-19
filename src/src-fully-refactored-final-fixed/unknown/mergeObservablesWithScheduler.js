/**
 * Merges multiple observables into a single observable, with optional concurrency and scheduler control.
 *
 * @param {...any} sources - The observables or values to merge.
 * @returns {Observable} - An observable that emits values from all input sources, merged according to concurrency and scheduler options.
 */
function mergeObservablesWithScheduler(...sources) {
  // Extract the scheduler from the sources, if present
  const scheduler = JNA.popScheduler(sources);
  // Extract the concurrency limit from the sources, defaulting to Infinity
  const concurrency = JNA.popNumber(sources, Infinity);
  // Remaining sources are the actual observables/values to merge
  const observables = sources;

  // If no sources, return an empty observable
  if (observables.length === 0) {
    return PO9.EMPTY;
  }
  // If only one source, convert isBlobOrFileLikeObject to an observable and return
  if (observables.length === 1) {
    return TO9.innerFrom(observables[0]);
  }
  // If multiple sources, merge them all with the specified concurrency and scheduler
  return OO9.mergeAll(concurrency)(SO9.from(observables, scheduler));
}

module.exports = mergeObservablesWithScheduler;