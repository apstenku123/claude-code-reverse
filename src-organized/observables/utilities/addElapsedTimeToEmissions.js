/**
 * Adds elapsed time (in milliseconds) since the previous emission to each value emitted by the source Observable.
 *
 * @param {SchedulerLike} [scheduler=hy9.asyncScheduler] - The scheduler to use for tracking time. Defaults to hy9.asyncScheduler.
 * @returns {OperatorFunction<BugReportForm, SLA<BugReportForm>>} An RxJS operator function that emits SLA objects containing the original value and the elapsed time since the previous emission.
 */
function addElapsedTimeToEmissions(scheduler = hy9.asyncScheduler) {
  return my9.operate(function (sourceObservable, subscriber) {
    // Capture the time of subscription
    let lastEmissionTime = scheduler.now();
    sourceObservable.subscribe(
      dy9.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Get the current time
          const currentTime = scheduler.now();
          // Calculate elapsed time since last emission
          const elapsedTime = currentTime - lastEmissionTime;
          // Update the last emission time
          lastEmissionTime = currentTime;
          // Emit a new SLA object with the value and elapsed time
          subscriber.next(new SLA(value, elapsedTime));
        }
      )
    );
  });
}

module.exports = addElapsedTimeToEmissions;