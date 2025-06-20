/**
 * Applies a concurrent mapping operation to each value emitted by the source observable, with a configurable concurrency limit and optional scheduling.
 *
 * @param {Observable} sourceObservable - The source observable to subscribe to.
 * @param {Object} destinationObserver - The observer to emit results to (must have next, error, complete methods).
 * @param {Function} projectFunction - Function to map each source value to an inner observable.
 * @param {number} concurrencyLimit - Maximum number of concurrent inner subscriptions.
 * @param {Function} [onNextCallback] - Optional callback invoked with each value emitted by the inner observable.
 * @param {boolean} [forwardValuesToDestination=false] - Whether to forward values to the destination observer immediately.
 * @param {Scheduler} [scheduler] - Optional scheduler for scheduling inner subscriptions.
 * @param {Function} [onFinalize] - Optional callback to invoke on finalization.
 * @returns {Function} Teardown logic to be called for cleanup.
 */
function concurrentMapOperator(
  sourceObservable,
  destinationObserver,
  projectFunction,
  concurrencyLimit,
  onNextCallback,
  forwardValuesToDestination = false,
  scheduler,
  onFinalize
) {
  const buffer = [];
  let activeSubscriptions = 0;
  let index = 0;
  let sourceCompleted = false;

  /**
   * Checks if all work is done and completes the destination observer if so.
   */
  const tryComplete = () => {
    if (sourceCompleted && buffer.length === 0 && activeSubscriptions === 0) {
      destinationObserver.complete();
    }
  };

  /**
   * Handles incoming values from the source observable.
   * Buffers or processes them depending on concurrency.
   * @param {*} value
   */
  const handleSourceValue = (value) => {
    if (activeSubscriptions < concurrencyLimit) {
      subscribeToInner(value);
    } else {
      buffer.push(value);
    }
  };

  /**
   * Subscribes to the inner observable created by the project function.
   * @param {*} value
   */
  const subscribeToInner = (value) => {
    if (forwardValuesToDestination) {
      destinationObserver.next(value);
    }
    activeSubscriptions++;
    let innerCompleted = false;
    wR9.innerFrom(projectFunction(value, index++)).subscribe(
      SUA.createOperatorSubscriber(
        destinationObserver,
        (innerValue) => {
          // Optionally call the provided callback with each inner value
          if (onNextCallback) {
            onNextCallback(innerValue);
          }
          if (forwardValuesToDestination) {
            handleSourceValue(innerValue);
          } else {
            destinationObserver.next(innerValue);
          }
        },
        () => {
          // Inner observable completed
          innerCompleted = true;
        },
        undefined,
        () => {
          // Finalizer for inner observable
          if (innerCompleted) {
            try {
              activeSubscriptions--;
              // Process buffered values if any and concurrency allows
              const processNextBuffered = () => {
                const nextValue = buffer.shift();
                if (scheduler) {
                  ER9.executeSchedule(destinationObserver, scheduler, () => subscribeToInner(nextValue));
                } else {
                  subscribeToInner(nextValue);
                }
              };
              while (buffer.length > 0 && activeSubscriptions < concurrencyLimit) {
                processNextBuffered();
              }
              tryComplete();
            } catch (err) {
              destinationObserver.error(err);
            }
          }
        }
      )
    );
  };

  // Subscribe to the source observable
  sourceObservable.subscribe(
    SUA.createOperatorSubscriber(
      destinationObserver,
      handleSourceValue,
      () => {
        sourceCompleted = true;
        tryComplete();
      }
    )
  );

  // Return teardown logic
  return () => {
    if (onFinalize) {
      onFinalize();
    }
  };
}

module.exports = concurrentMapOperator;