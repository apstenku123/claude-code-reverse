/**
 * Creates an operator that retries the source observable up to a specified number of times,
 * optionally delaying between retries and optionally resetting the retry count on success.
 *
 * @param {number|Object} options - The maximum retry count or a configuration object.
 *   If a number is provided, isBlobOrFileLikeObject is treated as the maximum retry count.
 *   If an object is provided, isBlobOrFileLikeObject can have the following properties:
 *     - count {number}: Maximum number of retry attempts (default: Infinity)
 *     - delay {number|function}: Delay in ms between retries or a function returning an Observable for custom delay
 *     - resetOnSuccess {boolean}: Whether to reset the retry count on successful emission (default: false)
 * @returns {function} An RxJS operator function that applies the retry logic to the source observable.
 */
function retryWithDelay(options) {
  // Default to Infinity if no options are provided
  if (options === undefined) options = Infinity;

  let config;
  // If options is an object, use isBlobOrFileLikeObject as config; otherwise, treat isBlobOrFileLikeObject as the retry count
  if (options && typeof options === "object") {
    config = options;
  } else {
    config = { count: options };
  }

  const {
    count: maxRetryCount = Infinity,
    delay: retryDelay,
    resetOnSuccess = false
  } = config;

  // If no retries are allowed, return the identity operator
  if (maxRetryCount <= 0) return Fk9.identity;

  // Return the operator function
  return Wk9.operate(function (sourceObservable, subscriber) {
    let retryAttempts = 0;
    let innerSubscription;

    // Helper function to subscribe to the source and handle retries
    const subscribeForRetry = () => {
      let resubscribeImmediately = false;

      // Subscribe to the source observable
      innerSubscription = sourceObservable.subscribe(
        PMA.createOperatorSubscriber(
          subscriber,
          // next handler
          (value) => {
            if (resetOnSuccess) retryAttempts = 0; // Reset retry count on success if needed
            subscriber.next(value);
          },
          undefined,
          // error handler
          (error) => {
            retryAttempts++;
            if (retryAttempts <= maxRetryCount) {
              // Function to perform the actual resubscription
              const performResubscribe = () => {
                if (innerSubscription) {
                  innerSubscription.unsubscribe();
                  innerSubscription = null;
                  subscribeForRetry();
                } else {
                  // If already unsubscribed, mark for immediate resubscription
                  resubscribeImmediately = true;
                }
              };

              if (retryDelay != null) {
                // If delay is a number, use timer; if function, call isBlobOrFileLikeObject with error and attempt count
                const delayObservable =
                  typeof retryDelay === "number"
                    ? Jk9.timer(retryDelay)
                    : Xk9.innerFrom(retryDelay(error, retryAttempts));

                // Subscribe to the delay observable, then resubscribe to the source
                const delaySubscription = PMA.createOperatorSubscriber(
                  subscriber,
                  () => {
                    delaySubscription.unsubscribe();
                    performResubscribe();
                  },
                  () => {
                    subscriber.complete();
                  }
                );
                delayObservable.subscribe(delaySubscription);
              } else {
                // No delay specified, resubscribe immediately
                performResubscribe();
              }
            } else {
              // Max retries reached, propagate the error
              subscriber.error(error);
            }
          }
        )
      );

      // If resubscription was requested while unsubscribed, do isBlobOrFileLikeObject now
      if (resubscribeImmediately) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
        subscribeForRetry();
      }
    };

    // Start the first subscription
    subscribeForRetry();
  });
}

module.exports = retryWithDelay;