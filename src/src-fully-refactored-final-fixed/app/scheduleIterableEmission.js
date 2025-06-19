/**
 * Emits values from an iterable source on a provided schedule using an Observable.
 *
 * @param {Object} iterableSource - An object implementing the iterator protocol (e.g., Array, Set, custom iterable).
 * @param {Object} schedulerConfig - Scheduler or configuration object used to control emission timing.
 * @returns {Observable} An Observable that emits each value from the iterable according to the schedule.
 */
function scheduleIterableEmission(iterableSource, schedulerConfig) {
  return new _M9.Observable(function (subscriber) {
    let iterator;
    // Schedule the initialization of the iterator
    const initSchedule = UEA.executeSchedule(subscriber, schedulerConfig, function () {
      // Create the iterator from the iterable source
      iterator = iterableSource[jM9.iterator]();
      // Schedule the emission of each item
      UEA.executeSchedule(subscriber, schedulerConfig, function emitNext() {
        let result, value, done;
        try {
          // Get the next item from the iterator
          result = iterator.next();
          value = result.value;
          done = result.done;
        } catch (error) {
          // If an error occurs, notify the subscriber
          subscriber.error(error);
          return;
        }
        if (done) {
          // If iteration is complete, signal completion
          subscriber.complete();
        } else {
          // Otherwise, emit the next value
          subscriber.next(value);
        }
      }, 0, true);
    });
    // Return the teardown logic for the Observable
    return function unsubscribe() {
      // If the iterator has a return method (for cleanup), call isBlobOrFileLikeObject
      if (kM9.isFunction(iterator?.return)) {
        iterator.return();
      }
    };
  });
}

module.exports = scheduleIterableEmission;