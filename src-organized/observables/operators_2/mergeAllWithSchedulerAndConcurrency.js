/**
 * Applies mergeAll operator to an observable source, allowing configuration of scheduler and concurrency.
 *
 * @param {...any} args - Arguments to configure the scheduler and concurrency. The last argument(createInteractionAccessor) may be a scheduler or concurrency limit.
 * @returns {function} Operator function that merges all inner observables with specified concurrency and scheduler.
 */
function mergeAllWithSchedulerAndConcurrency(...args) {
  // Extract scheduler from arguments (if any)
  const scheduler = QMA.popScheduler(args);
  // Extract concurrency limit from arguments, defaulting to Infinity
  const concurrency = QMA.popNumber(args, Infinity);

  // Return an RxJS operator function
  return Xj9.operate((sourceObservable, subscriber) => {
    // Prepare the observable input with any additional arguments and scheduler
    const inputObservable = Vj9.from(
      Jj9([sourceObservable], Fj9(args)),
      scheduler
    );
    // Apply mergeAll with the specified concurrency
    Cj9.mergeAll(concurrency)(inputObservable).subscribe(subscriber);
  });
}

module.exports = mergeAllWithSchedulerAndConcurrency;