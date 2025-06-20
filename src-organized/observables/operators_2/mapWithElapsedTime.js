/**
 * Maps each emitted value from the source observable to a new object containing the value and the time elapsed since the previous emission.
 *
 * @param {SchedulerLike} [scheduler=hy9.asyncScheduler] - The scheduler to use for tracking time. Defaults to hy9.asyncScheduler if not provided.
 * @returns {function} An operator function to be used with observables.
 */
function mapWithElapsedTime(scheduler = hy9.asyncScheduler) {
  return my9.operate(function (sourceObservable, subscriber) {
    // Capture the initial timestamp
    let lastTimestamp = scheduler.now();
    
    // Subscribe to the source observable
    sourceObservable.subscribe(
      dy9.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Get the current timestamp
          const currentTimestamp = scheduler.now();
          // Calculate the elapsed time since the last emission
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

module.exports = mapWithElapsedTime;