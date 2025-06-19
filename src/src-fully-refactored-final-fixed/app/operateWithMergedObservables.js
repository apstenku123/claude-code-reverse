/**
 * Applies an operator function that merges multiple observables, using a specified concurrency limit and scheduler.
 *
 * @param {...any} args - Arguments to configure the concurrency and scheduler for merging observables.
 * @returns {function} Operator function that merges observables with the given concurrency and scheduler.
 */
function operateWithMergedObservables(...args) {
  // Extract the scheduler from the arguments using QMA.popScheduler
  const scheduler = QMA.popScheduler(args);
  // Extract the concurrency limit from the arguments, defaulting to Infinity
  const concurrency = QMA.popNumber(args, Infinity);

  // Return an operator function that merges observables
  return Xj9.operate(function (sourceObservable, subscriber) {
    // Combine the source observable with any additional arguments, applying Fj9 to args
    // Jj9([sourceObservable], Fj9(args)) creates an array of observables to merge
    // Vj9.from converts this array to an observable, using the specified scheduler
    // Cj9.mergeAll(concurrency) merges the observables with the given concurrency limit
    Cj9.mergeAll(concurrency)(
      Vj9.from(
        Jj9([sourceObservable], Fj9(args)),
        scheduler
      )
    ).subscribe(subscriber);
  });
}

module.exports = operateWithMergedObservables;