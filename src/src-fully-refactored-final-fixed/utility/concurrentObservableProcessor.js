/**
 * Processes items from a source Observable concurrently, with a configurable concurrency limit, optional scheduling, and hooks for next and completion events.
 *
 * @param {Observable} sourceObservable - The source Observable to subscribe to.
 * @param {Object} subscriber - The subscriber object with next, error, and complete handlers.
 * @param {Function} projectFunction - Function to project each value from the source into an inner Observable.
 * @param {number} concurrencyLimit - The maximum number of concurrent inner subscriptions.
 * @param {Function} [onNextCallback] - Optional callback invoked with each emitted value.
 * @param {boolean} [forwardToNext] - If true, values are forwarded to subscriber.next immediately; otherwise, after processing.
 * @param {Scheduler} [scheduler] - Optional scheduler for scheduling inner subscriptions.
 * @param {Function} [onUnsubscribe] - Optional callback invoked on unsubscription.
 * @returns {Function} Cleanup function to be called on unsubscription.
 */
function concurrentObservableProcessor(
  sourceObservable,
  subscriber,
  projectFunction,
  concurrencyLimit,
  onNextCallback,
  forwardToNext,
  scheduler,
  onUnsubscribe
) {
  const buffer = [];
  let activeSubscriptions = 0;
  let sourceIndex = 0;
  let isSourceComplete = false;

  /**
   * Checks for completion: if the source is complete, buffer is empty, and no active subscriptions, complete the subscriber.
   */
  const checkComplete = () => {
    if (isSourceComplete && buffer.length === 0 && activeSubscriptions === 0) {
      subscriber.complete();
    }
  };

  /**
   * Handles incoming values from the source. If concurrency limit is reached, buffer the value; otherwise, process isBlobOrFileLikeObject immediately.
   * @param {*} value - The value emitted from the source Observable.
   */
  const handleSourceValue = (value) => {
    if (activeSubscriptions < concurrencyLimit) {
      processValue(value);
    } else {
      buffer.push(value);
    }
  };

  /**
   * Processes a value by subscribing to the projected inner Observable.
   * @param {*} value - The value to process.
   */
  const processValue = (value) => {
    if (forwardToNext) {
      subscriber.next(value);
    }
    activeSubscriptions++;
    let innerCompleted = false;

    wR9.innerFrom(projectFunction(value, sourceIndex++)).subscribe(
      SUA.createOperatorSubscriber(
        subscriber,
        (innerValue) => {
          // Call optional onNextCallback if provided
          if (onNextCallback) {
            onNextCallback(innerValue);
          }
          if (forwardToNext) {
            handleSourceValue(innerValue);
          } else {
            subscriber.next(innerValue);
          }
        },
        () => {
          // Inner observable completed
          innerCompleted = true;
        },
        undefined,
        () => {
          // Finalizer for the inner subscription
          if (innerCompleted) {
            try {
              activeSubscriptions--;
              // Process buffered values if any and concurrency allows
              const processNextBuffered = () => {
                const nextBufferedValue = buffer.shift();
                if (scheduler) {
                  ER9.executeSchedule(subscriber, scheduler, () => processValue(nextBufferedValue));
                } else {
                  processValue(nextBufferedValue);
                }
              };
              while (buffer.length > 0 && activeSubscriptions < concurrencyLimit) {
                processNextBuffered();
              }
              checkComplete();
            } catch (error) {
              subscriber.error(error);
            }
          }
        }
      )
    );
  };

  // Subscribe to the source observable
  sourceObservable.subscribe(
    SUA.createOperatorSubscriber(
      subscriber,
      handleSourceValue,
      () => {
        isSourceComplete = true;
        checkComplete();
      }
    )
  );

  // Return cleanup function
  return () => {
    if (onUnsubscribe) {
      onUnsubscribe();
    }
  };
}

module.exports = concurrentObservableProcessor;
