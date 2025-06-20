/**
 * Processes values from a source Observable with controlled concurrency, applying a projection function to each value.
 * Handles completion, error propagation, and optional scheduling for inner observables.
 *
 * @param {Observable} sourceObservable - The source Observable to subscribe to.
 * @param {Object} destinationSubscriber - The subscriber or observer to emit results to (must have next, error, complete methods).
 * @param {Function} project - Function to project each source value into an inner Observable.
 * @param {number} concurrencyLimit - Maximum number of concurrent inner subscriptions.
 * @param {Function} [onInnerNext] - Optional callback invoked with each inner value.
 * @param {boolean} [shouldEmitSourceValue=false] - If true, emits the source value before subscribing to the inner Observable.
 * @param {Scheduler} [scheduler] - Optional scheduler for executing inner subscriptions.
 * @param {Function} [onFinalize] - Optional cleanup function to call on teardown.
 * @returns {Function} Teardown logic to be called on unsubscription.
 */
function processConcurrentObservables(
  sourceObservable,
  destinationSubscriber,
  project,
  concurrencyLimit,
  onInnerNext,
  shouldEmitSourceValue = false,
  scheduler,
  onFinalize
) {
  const buffer = [];
  let activeSubscriptions = 0;
  let sourceIndex = 0;
  let isSourceComplete = false;

  /**
   * Checks for completion: if source is complete, buffer is empty, and no active inner subscriptions, complete the destination.
   */
  const checkComplete = () => {
    if (isSourceComplete && buffer.length === 0 && activeSubscriptions === 0) {
      destinationSubscriber.complete();
    }
  };

  /**
   * Handles incoming source value: either processes immediately or buffers if concurrency limit is reached.
   * @param {*} value - The value emitted by the source Observable.
   */
  const handleSourceValue = (value) => {
    if (activeSubscriptions < concurrencyLimit) {
      subscribeToInner(value);
    } else {
      buffer.push(value);
    }
  };

  /**
   * Subscribes to the inner Observable projected from the source value.
   * @param {*} value - The value to project and subscribe to.
   */
  const subscribeToInner = (value) => {
    if (shouldEmitSourceValue) {
      destinationSubscriber.next(value);
    }
    activeSubscriptions++;
    let innerCompleted = false;
    wR9.innerFrom(project(value, sourceIndex++)).subscribe(
      SUA.createOperatorSubscriber(
        destinationSubscriber,
        (innerValue) => {
          // Optionally call onInnerNext, then emit or buffer
          if (onInnerNext) {
            onInnerNext(innerValue);
          }
          if (shouldEmitSourceValue) {
            handleSourceValue(innerValue);
          } else {
            destinationSubscriber.next(innerValue);
          }
        },
        // Inner error handler (no-op, handled by outer error)
        () => {
          innerCompleted = true;
        },
        undefined,
        // Inner complete handler
        () => {
          if (innerCompleted) {
            try {
              activeSubscriptions--;
              // Process buffered values if any and concurrency allows
              const processNextBuffered = () => {
                const nextValue = buffer.shift();
                if (scheduler) {
                  ER9.executeSchedule(destinationSubscriber, scheduler, () => subscribeToInner(nextValue));
                } else {
                  subscribeToInner(nextValue);
                }
              };
              while (buffer.length > 0 && activeSubscriptions < concurrencyLimit) {
                processNextBuffered();
              }
              checkComplete();
            } catch (err) {
              destinationSubscriber.error(err);
            }
          }
        }
      )
    );
  };

  // Subscribe to the source observable
  sourceObservable.subscribe(
    SUA.createOperatorSubscriber(
      destinationSubscriber,
      handleSourceValue,
      () => {
        isSourceComplete = true;
        checkComplete();
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

module.exports = processConcurrentObservables;