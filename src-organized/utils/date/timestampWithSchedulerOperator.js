/**
 * Emits each value from the source Observable along with the time elapsed (in ms) since the previous emission, using a provided scheduler.
 *
 * @param {SchedulerLike} [scheduler=asyncScheduler] - The scheduler to use for getting the current time. Defaults to asyncScheduler.
 * @returns {OperatorFunction<BugReportForm, SLA<BugReportForm>>} An RxJS operator function that emits SLA objects containing the original value and the elapsed time since the last emission.
 */
function timestampWithSchedulerOperator(scheduler = hy9.asyncScheduler) {
  return my9.operate(function applyTimestampOperator(sourceObservable, subscriber) {
    // Store the timestamp of the last emission
    let lastTimestamp = scheduler.now();
    // Subscribe to the source observable
    sourceObservable.subscribe(
      dy9.createOperatorSubscriber(
        subscriber,
        function handleNext(value) {
          // Get the current time
          const currentTimestamp = scheduler.now();
          // Calculate the time difference since the last emission
          const elapsed = currentTimestamp - lastTimestamp;
          // Update the last timestamp
          lastTimestamp = currentTimestamp;
          // Emit the value along with the elapsed time
          subscriber.next(new SLA(value, elapsed));
        }
      )
    );
  });
}

module.exports = timestampWithSchedulerOperator;