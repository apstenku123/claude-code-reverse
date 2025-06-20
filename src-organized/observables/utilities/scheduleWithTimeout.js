/**
 * Schedules the subscription to an observable with a timeout, delay, or interval, and allows for custom scheduling and meta information.
 *
 * @param {Object|number|Date} sourceConfig - Configuration for the timeout. Can be:
 *   - a Date (first timeout)
 *   - a number (interval in ms)
 *   - an object with keys: first, each, with, scheduler, meta
 * @param {Object} [defaultScheduler] - Optional default scheduler to use if not provided in config.
 * @returns {Function} Operator function to be used with observables.
 */
function scheduleWithTimeout(sourceConfig, defaultScheduler) {
  // Normalize the configuration object
  const subscriptionConfig = PL9.isValidDate(sourceConfig)
    ? { first: sourceConfig }
    : typeof sourceConfig === "number"
      ? { each: sourceConfig }
      : sourceConfig;

  const {
    first: firstTimeout,
    each: intervalTimeout,
    with: withCallback,
    scheduler: schedulerOption,
    meta: metaInfo
  } = subscriptionConfig;

  // Use default callback if none provided
  const timeoutCallback = withCallback === undefined ? throwTimeoutError : withCallback;
  // Use provided scheduler, or fallback to defaultScheduler or TL9.asyncScheduler
  const scheduler = schedulerOption === undefined
    ? (defaultScheduler !== null && defaultScheduler !== undefined ? defaultScheduler : TL9.asyncScheduler)
    : schedulerOption;
  // Use null if meta is not provided
  const meta = metaInfo === undefined ? null : metaInfo;

  // Ensure at least one timeout is provided
  if (firstTimeout == null && intervalTimeout == null) {
    throw new TypeError("No timeout provided.");
  }

  // Return the operator function
  return SL9.operate(function (source, subscriber) {
    let sourceSubscription;
    let scheduledTask;
    let lastValue = null;
    let seenCount = 0;

    /**
     * Schedules the timeout task after the given delay
     * @param {number} delay - Delay in milliseconds
     */
    const scheduleTimeout = (delay) => {
      scheduledTask = yL9.executeSchedule(subscriber, scheduler, () => {
        try {
          // Unsubscribe from the source
          sourceSubscription.unsubscribe();
          // Call the timeout callback and subscribe to its result
          _L9.innerFrom(timeoutCallback({
            meta,
            lastValue,
            seen: seenCount
          })).subscribe(subscriber);
        } catch (error) {
          subscriber.error(error);
        }
      }, delay);
    };

    // Subscribe to the source observable
    sourceSubscription = source.subscribe(
      kL9.createOperatorSubscriber(
        subscriber,
        (value) => {
          // On next value, cancel any scheduled timeout, emit value, and reschedule if intervalTimeout is set
          if (scheduledTask !== null && scheduledTask !== undefined) {
            scheduledTask.unsubscribe();
          }
          seenCount++;
          lastValue = value;
          subscriber.next(value);
          if (intervalTimeout > 0) {
            scheduleTimeout(intervalTimeout);
          }
        },
        undefined,
        undefined,
        () => {
          // On complete, clean up scheduled task
          if (!(scheduledTask?.closed)) {
            scheduledTask?.unsubscribe();
          }
          lastValue = null;
        }
      )
    );

    // If no values have been seen yet, schedule the initial timeout
    if (!seenCount) {
      // If firstTimeout is a number, use isBlobOrFileLikeObject directly
      // If isBlobOrFileLikeObject'createInteractionAccessor a Date, calculate the delay from now
      // Otherwise, fallback to intervalTimeout
      let initialDelay;
      if (firstTimeout != null) {
        initialDelay = typeof firstTimeout === "number"
          ? firstTimeout
          : (+firstTimeout - scheduler.now());
      } else {
        initialDelay = intervalTimeout;
      }
      scheduleTimeout(initialDelay);
    }
  });
}

module.exports = scheduleWithTimeout;