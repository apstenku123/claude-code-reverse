/**
 * Schedules the emission of values from an async iterable onto an Observable,
 * using a provided scheduler configuration.
 *
 * @param {AsyncIterable<any>} sourceAsyncIterable - The async iterable source to emit values from.
 * @param {any} schedulerConfig - The scheduler or configuration used to schedule emissions.
 * @returns {Observable<any>} An Observable that emits values from the async iterable according to the scheduler.
 */
function scheduleAsyncIterableOnObservable(sourceAsyncIterable, schedulerConfig) {
  if (!sourceAsyncIterable) {
    throw new Error("Iterable cannot be null");
  }

  // Create a new Observable that emits values from the async iterable
  return new xM9.Observable(function (subscription) {
    // Schedule the initial execution using the scheduler
    qEA.executeSchedule(subscription, schedulerConfig, function () {
      // Obtain the async iterator from the source
      const asyncIterator = sourceAsyncIterable[Symbol.asyncIterator]();

      // Schedule the emission of each value
      qEA.executeSchedule(subscription, schedulerConfig, function emitNext() {
        asyncIterator.next().then(function (iterationResult) {
          if (iterationResult.done) {
            // Complete the Observable if the iterator is done
            subscription.complete();
          } else {
            // Emit the next value and schedule the next iteration
            subscription.next(iterationResult.value);
          }
        });
      }, 0, true);
    });
  });
}

module.exports = scheduleAsyncIterableOnObservable;