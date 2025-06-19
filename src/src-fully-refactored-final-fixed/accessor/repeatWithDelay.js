/**
 * Creates an operator that repeats the source observable a specified number of times,
 * optionally introducing a delay between repetitions.
 *
 * @param {number|Object} repeatConfig - The number of times to repeat, or a config object.
 *   If a number, isBlobOrFileLikeObject specifies the repeat count.
 *   If an object, isBlobOrFileLikeObject can have the following properties:
 *     - count {number}: The number of times to repeat (default: Infinity)
 *     - delay {number|function(repeatIndex: number): Observable}: Delay duration in ms or a function returning an Observable for delay
 * @returns {function} An operator function to be used with an Observable.
 */
function repeatWithDelay(repeatConfig) {
  let repeatCount = Infinity;
  let delayConfig;

  // Parse configuration
  if (repeatConfig != null) {
    if (typeof repeatConfig === "object") {
      repeatCount = repeatConfig.count === undefined ? Infinity : repeatConfig.count;
      delayConfig = repeatConfig.delay;
    } else {
      repeatCount = repeatConfig;
    }
  }

  // If repeat count is zero or negative, return an empty observable
  if (repeatCount <= 0) {
    return function () {
      return ej9.EMPTY;
    };
  }

  // Main operator logic
  return Ak9.operate(function (sourceObservable, subscriber) {
    let currentRepetition = 0;
    let innerSubscription;

    /**
     * Handles the delay between repetitions, if configured.
     * If no delay, immediately resubscribes to the source.
     */
    const handleDelayAndRepeat = function () {
      // Unsubscribe from any previous delay observable
      if (innerSubscription != null) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
      }

      if (delayConfig != null) {
        // Determine the delay observable
        const delayObservable = typeof delayConfig === "number"
          ? Qk9.timer(delayConfig)
          : Bk9.innerFrom(delayConfig(currentRepetition));

        // Subscribe to the delay observable, then repeat
        const delaySubscriber = qMA.createOperatorSubscriber(subscriber, function () {
          delaySubscriber.unsubscribe();
          subscribeToSource();
        });
        delayObservable.subscribe(delaySubscriber);
        innerSubscription = delaySubscriber;
      } else {
        // No delay, immediately repeat
        subscribeToSource();
      }
    };

    /**
     * Subscribes to the source observable and handles completion logic.
     */
    const subscribeToSource = function () {
      let shouldRepeatAfterSubscribe = false;
      innerSubscription = sourceObservable.subscribe(
        qMA.createOperatorSubscriber(
          subscriber,
          undefined,
          function onComplete() {
            currentRepetition++;
            if (currentRepetition < repeatCount) {
              // If not unsubscribed, handle delay and repeat
              if (innerSubscription) {
                handleDelayAndRepeat();
              } else {
                // If unsubscribed during completion, defer repeat
                shouldRepeatAfterSubscribe = true;
              }
            } else {
              // Completed all repetitions
              subscriber.complete();
            }
          }
        )
      );
      // If unsubscribed during synchronous completion, repeat now
      if (shouldRepeatAfterSubscribe) {
        handleDelayAndRepeat();
      }
    };

    // Start the first subscription
    subscribeToSource();
  });
}

module.exports = repeatWithDelay;