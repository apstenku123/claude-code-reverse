/**
 * Applies a concurrent mapping function to each value emitted by the source observable, buffering excess values.
 *
 * @param {Observable} sourceObservable - The source observable to subscribe to.
 * @param {Object} destinationObserver - The observer to emit mapped values to (has next, error, complete).
 * @param {Function} projectFunction - Function to map each source value to an inner observable.
 * @param {number} concurrencyLimit - Maximum number of concurrent inner subscriptions.
 * @param {Function} [onInnerNext] - Optional callback invoked on each inner emission.
 * @param {boolean} [recurseOnInnerNext=false] - If true, recursively process inner emissions.
 * @param {Scheduler} [scheduler] - Optional scheduler to use for scheduling buffered emissions.
 * @param {Function} [onFinalize] - Optional cleanup function to call on teardown.
 * @returns {Function} Teardown logic to be called when unsubscribing.
 */
function concurrentMapWithBuffer(
  sourceObservable,
  destinationObserver,
  projectFunction,
  concurrencyLimit,
  onInnerNext,
  recurseOnInnerNext = false,
  scheduler,
  onFinalize
) {
  const buffer = [];
  let activeSubscriptions = 0;
  let projectIndex = 0;
  let sourceCompleted = false;

  /**
   * Checks if all work is done and completes the destination observer if so.
   */
  const checkComplete = () => {
    if (sourceCompleted && buffer.length === 0 && activeSubscriptions === 0) {
      destinationObserver.complete();
    }
  };

  /**
   * Handles incoming values from the source observable.
   * Buffers if concurrency limit is reached, otherwise processes immediately.
   * @param {*} value
   */
  const handleSourceValue = (value) => {
    if (activeSubscriptions < concurrencyLimit) {
      processValue(value);
    } else {
      buffer.push(value);
    }
  };

  /**
   * Processes a value by subscribing to the inner observable returned by projectFunction.
   * @param {*} value
   */
  const processValue = (value) => {
    if (recurseOnInnerNext) {
      destinationObserver.next(value);
    }
    activeSubscriptions++;
    let innerCompleted = false;
    wR9.innerFrom(projectFunction(value, projectIndex++)).subscribe(
      SUA.createOperatorSubscriber(
        destinationObserver,
        (innerValue) => {
          // Optionally call onInnerNext, then either recurse or emit
          if (onInnerNext) {
            onInnerNext(innerValue);
          }
          if (recurseOnInnerNext) {
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
          // Inner observable teardown
          if (innerCompleted) {
            try {
              activeSubscriptions--;
              // Process buffered values if any and concurrency allows
              const processBuffered = () => {
                const bufferedValue = buffer.shift();
                if (scheduler) {
                  ER9.executeSchedule(destinationObserver, scheduler, () => processValue(bufferedValue));
                } else {
                  processValue(bufferedValue);
                }
              };
              while (buffer.length > 0 && activeSubscriptions < concurrencyLimit) {
                processBuffered();
              }
              checkComplete();
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
        checkComplete();
      }
    )
  );

  // Teardown logic
  return () => {
    if (onFinalize) {
      onFinalize();
    }
  };
}

module.exports = concurrentMapWithBuffer;