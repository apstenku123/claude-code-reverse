/**
 * Processes the provided arguments into an observable sequence, applies a scheduler, and flattens the resulting observables into a single observable.
 *
 * @param {...any} args - The values or observables to be processed.
 * @returns {Observable} a single observable resulting from flattening all input observables.
 */
function getYR9Value(...args) {
  // Apply a scheduler to the input arguments and convert them into an observable sequence
  const scheduledObservable = kR9.from(args, jR9.popScheduler(args));

  // Flatten all inner observables into a single observable
  return _R9.concatAll()(scheduledObservable);
}

module.exports = getYR9Value;