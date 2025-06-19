/**
 * Emits each value from the source Observable along with the time interval (in ms) since the previous emission.
 *
 * @param {SchedulerLike} [scheduler=hy9.asyncScheduler] - The scheduler to use for getting the current time.
 * @returns {OperatorFunction<any, SLA>} An RxJS operator that emits objects containing the original value and the interval since the last emission.
 */
function timestampWithIntervalOperator(scheduler = hy9.asyncScheduler) {
  return my9.operate(function (sourceObservable, subscriber) {
    // Capture the initial timestamp
    let lastTimestamp = scheduler.now();
    // Subscribe to the source observable
    sourceObservable.subscribe(
      dy9.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Get current timestamp
          const currentTimestamp = scheduler.now();
          // Calculate interval since last emission
          const interval = currentTimestamp - lastTimestamp;
          // Update last timestamp
          lastTimestamp = currentTimestamp;
          // Emit the value along with the interval
          subscriber.next(new SLA(value, interval));
        }
      )
    );
  });
}

module.exports = timestampWithIntervalOperator;