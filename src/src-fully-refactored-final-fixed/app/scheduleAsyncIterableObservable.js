/**
 * Creates an Observable from an async iterable, scheduling its emissions using a provided scheduler configuration.
 *
 * @param {Object} asyncIterableSource - An object implementing Symbol.asyncIterator, representing the async iterable source.
 * @param {Object} schedulerConfig - Scheduler configuration or scheduler instance used to control emission timing.
 * @returns {Observable} An Observable that emits values from the async iterable, scheduled as specified.
 */
function scheduleAsyncIterableObservable(asyncIterableSource, schedulerConfig) {
  if (!asyncIterableSource) {
    throw new Error("Iterable cannot be null");
  }

  // Return a new Observable that emits values from the async iterable
  return new xM9.Observable(function (subscription) {
    // Schedule the initial execution using the provided scheduler
    qEA.executeSchedule(subscription, schedulerConfig, function () {
      // Get the async iterator from the source
      const asyncIterator = asyncIterableSource[Symbol.asyncIterator]();
      // Schedule the emission of each value from the iterator
      qEA.executeSchedule(subscription, schedulerConfig, function () {
        asyncIterator.next().then(function (iterationResult) {
          if (iterationResult.done) {
            // If the iterator is done, complete the Observable
            subscription.complete();
          } else {
            // Otherwise, emit the next value
            subscription.next(iterationResult.value);
          }
        });
      }, 0, true);
    });
  });
}

module.exports = scheduleAsyncIterableObservable;