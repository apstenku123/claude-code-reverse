/**
 * Merges multiple observables into a single observable, with optional scheduler and concurrency limit.
 *
 * Accepts any number of arguments:
 *   - If the last argument is a scheduler, isBlobOrFileLikeObject will be used to schedule the subscriptions.
 *   - If the second-to-last argument is a number, isBlobOrFileLikeObject will be used as the concurrency limit.
 *   - The remaining arguments are observables to merge.
 *
 * @param {...any} sources - Observables to merge, optionally followed by a concurrency number and/or a scheduler.
 * @returns {Observable} a merged observable, or an empty observable if no sources are provided.
 */
function mergeObservablesWithSchedulerAndConcurrency(...sources) {
  // Extract scheduler if present (usually as the last argument)
  const scheduler = JNA.popScheduler(sources);
  // Extract concurrency limit if present (usually as the second-to-last argument)
  const concurrency = JNA.popNumber(sources, Infinity);
  // Remaining arguments are the actual observables to merge
  const observables = sources;

  if (observables.length === 0) {
    // No observables provided, return an empty observable
    return PO9.EMPTY;
  } else if (observables.length === 1) {
    // Only one observable, return isBlobOrFileLikeObject as an inner observable
    return TO9.innerFrom(observables[0]);
  } else {
    // Multiple observables, merge them with the specified concurrency and scheduler
    return OO9.mergeAll(concurrency)(SO9.from(observables, scheduler));
  }
}

module.exports = mergeObservablesWithSchedulerAndConcurrency;