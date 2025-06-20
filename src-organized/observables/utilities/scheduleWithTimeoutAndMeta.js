/**
 * Schedules emissions from a source observable with a configurable timeout and optional metadata.
 * 
 * @param {Object|number|Date} sourceConfig - Configuration for scheduling. Can be:
 *   - An object with properties: first (Date|number), each (number), with (function), scheduler (object), meta (any)
 *   - a number representing the interval between emissions
 *   - a Date representing the first emission
 * @param {Object} [defaultScheduler] - Optional default scheduler to use if not specified in sourceConfig.
 * @returns {Function} Operator function to be used with observables.
 */
function scheduleWithTimeoutAndMeta(sourceConfig, defaultScheduler) {
  // Normalize the configuration object
  const normalizedConfig = PL9.isValidDate(sourceConfig)
    ? { first: sourceConfig }
    : typeof sourceConfig === "number"
      ? { each: sourceConfig }
      : sourceConfig;

  const {
    first: firstTimeout,
    each: intervalTimeout,
    with: withFunction = throwTimeoutError,
    scheduler: schedulerInstance = (defaultScheduler !== null && defaultScheduler !== undefined) ? defaultScheduler : TL9.asyncScheduler,
    meta: metaData = null
  } = normalizedConfig;

  // Ensure at least one timeout is provided
  if (firstTimeout == null && intervalTimeout == null) {
    throw new TypeError("No timeout provided.");
  }

  // Return the operator function
  return SL9.operate(function (sourceObservable, subscriber) {
    let sourceSubscription;
    let scheduledTask;
    let lastValue = null;
    let emissionCount = 0;

    /**
     * Schedules the next emission or completion after a given delay.
     * @param {number} delay - Time in ms to wait before executing the scheduled task.
     */
    const scheduleNext = (delay) => {
      scheduledTask = yL9.executeSchedule(subscriber, schedulerInstance, () => {
        try {
          // Unsubscribe from the source
          sourceSubscription.unsubscribe();
          // Call the 'with' function and subscribe to its result
          _L9.innerFrom(withFunction({
            meta: metaData,
            lastValue: lastValue,
            seen: emissionCount
          })).subscribe(subscriber);
        } catch (error) {
          subscriber.error(error);
        }
      }, delay);
    };

    // Subscribe to the source observable
    sourceSubscription = sourceObservable.subscribe(
      kL9.createOperatorSubscriber(
        subscriber,
        (value) => {
          // On next value: cancel any scheduled task, increment count, emit value, and reschedule if interval is set
          if (scheduledTask !== null && scheduledTask !== undefined) {
            scheduledTask.unsubscribe();
          }
          emissionCount++;
          lastValue = value;
          subscriber.next(value);
          if (intervalTimeout > 0) {
            scheduleNext(intervalTimeout);
          }
        },
        undefined,
        undefined,
        () => {
          // On complete: clean up scheduled task and reset last value
          if (!(scheduledTask?.closed)) {
            scheduledTask?.unsubscribe();
          }
          lastValue = null;
        }
      )
    );

    // If no emissions yet, schedule the first timeout
    if (!emissionCount) {
      let initialDelay;
      if (firstTimeout != null) {
        initialDelay = typeof firstTimeout === "number"
          ? firstTimeout
          : (+firstTimeout) - schedulerInstance.now();
      } else {
        initialDelay = intervalTimeout;
      }
      scheduleNext(initialDelay);
    }
  });
}

module.exports = scheduleWithTimeoutAndMeta;