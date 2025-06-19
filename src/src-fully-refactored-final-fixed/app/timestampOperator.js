/**
 * Adds a timestamp to each emitted value from the source observable, indicating the time elapsed since the previous emission.
 *
 * @param {SchedulerLike} [scheduler=hy9.asyncScheduler] - The scheduler to use for getting the current time.
 * @returns {function} An operator function that can be used with an observable to emit values with timestamps.
 */
function timestampOperator(scheduler = hy9.asyncScheduler) {
  return my9.operate(function applyTimestampOperator(sourceObservable, subscriber) {
    // Capture the initial time when the subscription starts
    let lastEmissionTime = scheduler.now();

    // Subscribe to the source observable
    sourceObservable.subscribe(
      dy9.createOperatorSubscriber(
        subscriber,
        function handleNext(value) {
          // Get the current time
          const currentTime = scheduler.now();
          // Calculate the time difference since the last emission
          const timeElapsed = currentTime - lastEmissionTime;
          // Update the last emission time
          lastEmissionTime = currentTime;
          // Emit the value along with the elapsed time
          subscriber.next(new SLA(value, timeElapsed));
        }
      )
    );
  });
}

module.exports = timestampOperator;