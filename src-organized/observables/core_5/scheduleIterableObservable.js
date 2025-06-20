/**
 * Creates an Observable that emits values from the provided iterable source, scheduled according to the given scheduler configuration.
 *
 * @param {Object} iterableSource - An object implementing the iterator protocol (e.g., an array, Set, or custom iterable).
 * @param {Object} schedulerConfig - The scheduler or configuration used to schedule emissions.
 * @returns {Observable} An Observable that emits the values from the iterable source according to the scheduler.
 */
function scheduleIterableObservable(iterableSource, schedulerConfig) {
  return new _M9.Observable(function (subscriber) {
    let iterator;
    // Schedule the initial execution to obtain the iterator
    const initialSchedule = UEA.executeSchedule(subscriber, schedulerConfig, function () {
      iterator = iterableSource[jM9.iterator]();
      // Schedule the emission of each value from the iterator
      UEA.executeSchedule(subscriber, schedulerConfig, function () {
        let nextResult, value, done;
        try {
          nextResult = iterator.next();
          value = nextResult.value;
          done = nextResult.done;
        } catch (error) {
          // If an error occurs during iteration, notify the subscriber
          subscriber.error(error);
          return;
        }
        if (done) {
          // If iteration is complete, notify completion
          subscriber.complete();
        } else {
          // Otherwise, emit the next value
          subscriber.next(value);
        }
      }, 0, true);
    });
    // Return the teardown logic for the Observable
    return function () {
      // If the iterator has a return method (for cleanup), call isBlobOrFileLikeObject
      if (kM9.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return)) {
        iterator.return();
      }
    };
  });
}

module.exports = scheduleIterableObservable;