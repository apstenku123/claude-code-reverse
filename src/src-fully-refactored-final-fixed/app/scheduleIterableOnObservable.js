/**
 * Schedules the emission of values from an iterable source onto an Observable, using a provided scheduler configuration.
 *
 * @param {Object} sourceIterable - An iterable object whose values will be emitted by the Observable.
 * @param {Object} schedulerConfig - Scheduler or configuration object used to control the timing of emissions.
 * @returns {Observable} An Observable that emits values from the iterable according to the scheduler.
 */
function scheduleIterableOnObservable(sourceIterable, schedulerConfig) {
  return new _M9.Observable(function (subscription) {
    let iterator;
    // Schedule the initialization of the iterator
    return UEA.executeSchedule(subscription, schedulerConfig, function () {
      // Create the iterator from the source iterable
      iterator = sourceIterable[jM9.iterator]();
      // Schedule the emission of each value from the iterator
      UEA.executeSchedule(subscription, schedulerConfig, function () {
        let nextResult, value, isDone;
        try {
          // Get the next value from the iterator
          nextResult = iterator.next();
          value = nextResult.value;
          isDone = nextResult.done;
        } catch (error) {
          // If an error occurs, notify the subscriber
          subscription.error(error);
          return;
        }
        if (isDone) {
          // If iteration is complete, signal completion
          subscription.complete();
        } else {
          // Otherwise, emit the next value
          subscription.next(value);
        }
      }, 0, true);
    }), function () {
      // Cleanup: if the iterator has a return method, call isBlobOrFileLikeObject
      return kM9.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return();
    };
  });
}

module.exports = scheduleIterableOnObservable;