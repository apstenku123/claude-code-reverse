/**
 * Processes items from a source Observable with a configurable concurrency limit, queuing excess items,
 * and handling completion, error, and scheduling logic. Invokes provided callbacks at appropriate stages.
 *
 * @param {Observable} sourceObservable - The source Observable emitting items to process.
 * @param {Object} destinationSubscriber - The subscriber or observer to emit processed items to.
 * @param {Function} projectFn - Function to transform each emitted item (maps value to inner Observable).
 * @param {number} concurrencyLimit - Maximum number of concurrent inner subscriptions allowed.
 * @param {Function} [onNextCallback] - Optional callback invoked with each processed value.
 * @param {boolean} [forwardToNext] - If true, forwards the original value to the destinationSubscriber before processing.
 * @param {SchedulerLike} [scheduler] - Optional scheduler for scheduling queued items.
 * @param {Function} [onFinalize] - Optional callback invoked on finalization.
 * @returns {Function} Cleanup function to be called on unsubscription.
 */
function processConcurrentObservableQueue(
  sourceObservable,
  destinationSubscriber,
  projectFn,
  concurrencyLimit,
  onNextCallback,
  forwardToNext,
  scheduler,
  onFinalize
) {
  const queue = [];
  let activeCount = 0;
  let index = 0;
  let sourceCompleted = false;

  /**
   * Checks if processing is complete and calls complete on the destinationSubscriber if so.
   */
  const checkComplete = () => {
    if (sourceCompleted && queue.length === 0 && activeCount === 0) {
      destinationSubscriber.complete();
    }
  };

  /**
   * Handles incoming values: processes immediately if under concurrency limit, otherwise queues.
   * @param {*} value - The value emitted by the source Observable.
   */
  const handleValue = (value) => {
    if (activeCount < concurrencyLimit) {
      processValue(value);
    } else {
      queue.push(value);
    }
  };

  /**
   * Processes a value by subscribing to the projected inner Observable.
   * @param {*} value - The value to process.
   */
  const processValue = (value) => {
    if (forwardToNext) {
      destinationSubscriber.next(value);
    }
    activeCount++;
    let innerCompleted = false;

    wR9.innerFrom(projectFn(value, index++)).subscribe(
      SUA.createOperatorSubscriber(
        destinationSubscriber,
        (innerValue) => {
          // Call onNextCallback if provided
          if (onNextCallback) {
            onNextCallback(innerValue);
          }
          if (forwardToNext) {
            handleValue(innerValue);
          } else {
            destinationSubscriber.next(innerValue);
          }
        },
        () => {
          // Inner complete
          innerCompleted = true;
        },
        undefined,
        () => {
          // Finalize logic after inner Observable completes
          if (innerCompleted) {
            try {
              activeCount--;
              // Process queued items if any and under concurrency limit
              const processNextInQueue = () => {
                const nextValue = queue.shift();
                if (scheduler) {
                  ER9.executeSchedule(destinationSubscriber, scheduler, () => processValue(nextValue));
                } else {
                  processValue(nextValue);
                }
              };
              while (queue.length > 0 && activeCount < concurrencyLimit) {
                processNextInQueue();
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

  // Subscribe to the source Observable
  sourceObservable.subscribe(
    SUA.createOperatorSubscriber(
      destinationSubscriber,
      handleValue,
      () => {
        sourceCompleted = true;
        checkComplete();
      }
    )
  );

  // Return cleanup function
  return () => {
    if (onFinalize) {
      onFinalize();
    }
  };
}

module.exports = processConcurrentObservableQueue;