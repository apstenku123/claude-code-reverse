/**
 * Emits the latest value from the source Observable at most once per specified duration,
 * using the provided scheduler for timing. If a new value arrives during the throttle period,
 * only the latest value is emitted after the period ends.
 *
 * @param {number} throttleDuration - The duration (in milliseconds) to throttle emissions.
 * @param {Object} [scheduler=BS9.asyncScheduler] - The scheduler to use for managing timers.
 * @returns {function} Operator function that can be used with Observable'createInteractionAccessor pipe method.
 */
function throttleLatestWithScheduler(throttleDuration, scheduler = BS9.asyncScheduler) {
  return QS9.operate(function (sourceObservable, subscriber) {
    let scheduledSubscription = null; // Holds the scheduled emission subscription
    let latestValue = null;           // Stores the latest value received
    let lastEmissionTime = null;      // Timestamp of the last emission

    /**
     * Emits the latest value and clears state.
     */
    const emitLatestValue = () => {
      if (scheduledSubscription) {
        scheduledSubscription.unsubscribe();
        scheduledSubscription = null;
        const valueToEmit = latestValue;
        latestValue = null;
        subscriber.next(valueToEmit);
      }
    };

    /**
     * Schedules the next emission if within the throttle window, otherwise emits immediately.
     */
    function scheduleOrEmit() {
      const nextAllowedEmission = lastEmissionTime + throttleDuration;
      const currentTime = scheduler.now();
      if (currentTime < nextAllowedEmission) {
        // Still within throttle window, reschedule
        scheduledSubscription = this.schedule(undefined, nextAllowedEmission - currentTime);
        subscriber.add(scheduledSubscription);
        return;
      }
      // Throttle window has passed, emit now
      emitLatestValue();
    }

    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      IS9.createOperatorSubscriber(
        subscriber,
        function (value) {
          latestValue = value;
          lastEmissionTime = scheduler.now();
          // If not already scheduled, schedule emission
          if (!scheduledSubscription) {
            scheduledSubscription = scheduler.schedule(scheduleOrEmit, throttleDuration);
            subscriber.add(scheduledSubscription);
          }
        },
        function () {
          // On complete, emit any pending value and complete downstream
          emitLatestValue();
          subscriber.complete();
        },
        undefined,
        function () {
          // On unsubscribe, clear state
          latestValue = null;
          scheduledSubscription = null;
        }
      )
    );
  });
}

module.exports = throttleLatestWithScheduler;