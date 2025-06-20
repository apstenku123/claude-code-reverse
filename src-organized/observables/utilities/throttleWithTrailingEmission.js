/**
 * Emits the latest value from the source Observable only after a specified duration has passed since the last emission.
 * If a new value arrives during the throttle period, only the most recent value is emitted at the end of the period.
 *
 * @param {number} throttleDuration - The duration (in milliseconds) to throttle emissions.
 * @param {Object} [scheduler=BS9.asyncScheduler] - The scheduler to use for managing timers. Must provide .now() and .schedule().
 * @returns {function} An operator function to be used with an Observable.
 */
function throttleWithTrailingEmission(throttleDuration, scheduler = BS9.asyncScheduler) {
  return QS9.operate(function (sourceObservable, subscriber) {
    let scheduledSubscription = null; // Holds the scheduled emission subscription
    let latestValue = null;           // Stores the latest value received during the throttle period
    let lastEmissionTime = null;      // Timestamp of the last emission

    /**
     * Emits the latest value and clears the scheduled subscription.
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
     * Schedules the emission if the throttle duration has not yet elapsed.
     * Otherwise, emits the latest value immediately.
     */
    function scheduleEmission() {
      const nextAllowedEmission = lastEmissionTime + throttleDuration;
      const currentTime = scheduler.now();
      if (currentTime < nextAllowedEmission) {
        // Not enough time has passed, reschedule
        scheduledSubscription = this.schedule(undefined, nextAllowedEmission - currentTime);
        subscriber.add(scheduledSubscription);
        return;
      }
      // Enough time has passed, emit now
      emitLatestValue();
    }

    // Subscribe to the source observable
    sourceObservable.subscribe(
      IS9.createOperatorSubscriber(
        subscriber,
        (value) => {
          // On next: store the latest value and schedule emission if not already scheduled
          latestValue = value;
          lastEmissionTime = scheduler.now();
          if (!scheduledSubscription) {
            scheduledSubscription = scheduler.schedule(scheduleEmission, throttleDuration);
            subscriber.add(scheduledSubscription);
          }
        },
        () => {
          // On complete: emit any pending value and complete downstream
          emitLatestValue();
          subscriber.complete();
        },
        undefined,
        () => {
          // On unsubscribe: clear state
          latestValue = null;
          scheduledSubscription = null;
        }
      )
    );
  });
}

module.exports = throttleWithTrailingEmission;