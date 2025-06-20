/**
 * Applies a timeout or scheduled delay to an observable sequence, optionally with custom scheduling, meta, and completion logic.
 *
 * @param {Date|number|Object} sourceConfig - The timeout configuration. Can be:
 *   - a Date (first timeout)
 *   - a number (timeout duration in ms for each emission)
 *   - An object with keys: first, each, with, scheduler, meta
 * @param {Object} [defaultScheduler] - Optional default scheduler to use if not provided in config.
 * @returns {Function} An RxJS operator function that applies the timeout logic to the source observable.
 */
function scheduleWithTimeoutOperator(sourceConfig, defaultScheduler) {
  // Normalize the configuration object
  const config = PL9.isValidDate(sourceConfig)
    ? { first: sourceConfig }
    : typeof sourceConfig === "number"
      ? { each: sourceConfig }
      : sourceConfig;

  const firstTimeout = config.first;
  const eachTimeout = config.each;
  const withCallback = config.with;
  const timeoutHandler = withCallback === undefined ? throwTimeoutError : withCallback;
  const scheduler = config.scheduler === undefined
    ? (defaultScheduler !== null && defaultScheduler !== undefined ? defaultScheduler : TL9.asyncScheduler)
    : config.scheduler;
  const meta = config.meta === undefined ? null : config.meta;

  if (firstTimeout == null && eachTimeout == null) {
    throw new TypeError("No timeout provided.");
  }

  // Return the RxJS operator
  return SL9.operate(function (source, subscriber) {
    let sourceSubscription;
    let scheduledTimeout;
    let lastValue = null;
    let emissionCount = 0;

    /**
     * Schedules a timeout after the specified delay.
     * @param {number} delay - The delay in milliseconds.
     */
    const scheduleTimeout = (delay) => {
      scheduledTimeout = yL9.executeSchedule(subscriber, scheduler, () => {
        try {
          // Unsubscribe from the source and switch to the timeout handler observable
          sourceSubscription.unsubscribe();
          _L9.innerFrom(timeoutHandler({
            meta,
            lastValue,
            seen: emissionCount
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
          // On next value: cancel any scheduled timeout, emit value, and reschedule if needed
          if (scheduledTimeout !== null && scheduledTimeout !== undefined) {
            scheduledTimeout.unsubscribe();
          }
          emissionCount++;
          lastValue = value;
          subscriber.next(value);
          if (eachTimeout > 0) {
            scheduleTimeout(eachTimeout);
          }
        },
        undefined,
        undefined,
        () => {
          // On complete: clean up any scheduled timeout and last value
          if (!(scheduledTimeout?.closed)) {
            scheduledTimeout?.unsubscribe();
          }
          lastValue = null;
        }
      )
    );

    // If no emissions yet, schedule the initial timeout
    if (!emissionCount) {
      let initialDelay;
      if (firstTimeout != null) {
        initialDelay = typeof firstTimeout === "number"
          ? firstTimeout
          : (+firstTimeout - scheduler.now());
      } else {
        initialDelay = eachTimeout;
      }
      scheduleTimeout(initialDelay);
    }
  });
}

module.exports = scheduleWithTimeoutOperator;