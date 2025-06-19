/**
 * Creates an Observable from a given source, optionally scheduling its execution.
 *
 * If a scheduler configuration is provided, the Observable is created using the scheduler.
 * Otherwise, a standard Observable is created from the source.
 *
 * @param {any} sourceObservable - The source to convert into an Observable (can be a Promise, Iterable, Observable, etc.).
 * @param {object} [schedulerConfig] - Optional scheduler configuration to control when subscription and notifications happen.
 * @returns {Observable} The resulting Observable, either scheduled or standard.
 */
function createObservableWithOptionalScheduler(sourceObservable, schedulerConfig) {
  // If a scheduler configuration is provided, use the scheduled creation method
  if (schedulerConfig) {
    return eM9.scheduled(sourceObservable, schedulerConfig);
  }
  // Otherwise, create the Observable directly from the source
  return AL9.innerFrom(sourceObservable);
}

module.exports = createObservableWithOptionalScheduler;