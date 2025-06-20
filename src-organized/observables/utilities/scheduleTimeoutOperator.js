/**
 * Applies a timeout or delay to an observable sequence, optionally scheduling a fallback observable or error when the timeout elapses.
 *
 * @param {Date|number|Object} sourceObservableOrConfig - The timeout configuration. Can be:
 *   - a Date: the absolute time to wait before timing out.
 *   - a number: the relative time (in ms) to wait before timing out each value.
 *   - An object with properties: { first, each, with, scheduler, meta }
 * @param {Object} [defaultScheduler] - Optional default scheduler to use if not provided in config.
 * @returns {Function} An operator function to be used with an Observable'createInteractionAccessor pipe method.
 */
function scheduleTimeoutOperator(sourceObservableOrConfig, defaultScheduler) {
  // Determine the configuration object based on the input type
  const config = PL9.isValidDate(sourceObservableOrConfig)
    ? { first: sourceObservableOrConfig }
    : typeof sourceObservableOrConfig === "number"
      ? { each: sourceObservableOrConfig }
      : sourceObservableOrConfig;

  const {
    first: firstTimeout,
    each: eachTimeout,
    with: withObservableFactory = throwTimeoutError, // Default fallback observable factory
    scheduler: schedulerInstance = (defaultScheduler !== null && defaultScheduler !== undefined ? defaultScheduler : TL9.asyncScheduler),
    meta: metaData = null
  } = config;

  // Ensure at least one timeout is provided
  if (firstTimeout == null && eachTimeout == null) {
    throw new TypeError("No timeout provided.");
  }

  // Return the operator function
  return SL9.operate(function (source, subscriber) {
    let sourceSubscription;
    let scheduledTimeoutSubscription;
    let lastValue = null;
    let seenCount = 0;

    /**
     * Schedules a timeout event after the specified delay.
     * @param {number} delay - The delay in milliseconds before timing out.
     */
    const scheduleTimeout = (delay) => {
      scheduledTimeoutSubscription = yL9.executeSchedule(
        subscriber,
        schedulerInstance,
        () => {
          try {
            // Unsubscribe from the source when timeout occurs
            sourceSubscription.unsubscribe();
            // Subscribe to the fallback observable (from withObservableFactory)
            _L9.innerFrom(withObservableFactory({
              meta: metaData,
              lastValue: lastValue,
              seen: seenCount
            })).subscribe(subscriber);
          } catch (error) {
            subscriber.error(error);
          }
        },
        delay
      );
    };

    // Subscribe to the source observable
    sourceSubscription = source.subscribe(
      kL9.createOperatorSubscriber(
        subscriber,
        (value) => {
          // On each value, clear any existing timeout and reschedule if needed
          if (scheduledTimeoutSubscription !== null && scheduledTimeoutSubscription !== undefined) {
            scheduledTimeoutSubscription.unsubscribe();
          }
          seenCount++;
          lastValue = value;
          subscriber.next(value);
          // If eachTimeout is set, schedule the next timeout
          if (eachTimeout > 0) {
            scheduleTimeout(eachTimeout);
          }
        },
        undefined,
        undefined,
        () => {
          // On complete, clean up any scheduled timeout
          if (!(scheduledTimeoutSubscription?.closed)) {
            scheduledTimeoutSubscription?.unsubscribe();
          }
          lastValue = null;
        }
      )
    );

    // If no values have been seen yet, schedule the initial timeout
    if (!seenCount) {
      let initialDelay;
      if (firstTimeout != null) {
        initialDelay = typeof firstTimeout === "number"
          ? firstTimeout
          : (+firstTimeout) - schedulerInstance.now();
      } else {
        initialDelay = eachTimeout;
      }
      scheduleTimeout(initialDelay);
    }
  });
}

module.exports = scheduleTimeoutOperator;