/**
 * Creates an RxJS operator that attaches observer callbacks (next, error, complete, etc.) to the source observable.
 *
 * This function allows you to provide either an observer object or individual callback functions for next, error, and complete events.
 * It wraps the observer and ensures proper subscription, unsubscription, and finalization logic.
 *
 * @param {Function|Object} nextOrObserver - Either a function to handle 'next' notifications or an observer object with next, error, complete, etc.
 * @param {Function} [errorCallback] - Optional error callback function.
 * @param {Function} [completeCallback] - Optional complete callback function.
 * @returns {Function} An RxJS operator function or the identity function if no observer is provided.
 */
function createOperatorWithObserver(nextOrObserver, errorCallback, completeCallback) {
  // Determine if the first argument is a function or if any callbacks are provided
  const observer = Ty9.isFunction(nextOrObserver) || errorCallback || completeCallback
    ? {
        next: nextOrObserver,
        error: errorCallback,
        complete: completeCallback
      }
    : nextOrObserver;

  // If no observer is provided, return the identity operator
  if (!observer) {
    return _y9.identity;
  }

  // Return an RxJS operator function
  return Py9.operate((sourceObservable, destinationSubscriber) => {
    // Call the optional 'subscribe' method on the observer if isBlobOrFileLikeObject exists
    if (observer.subscribe) {
      observer.subscribe.call(observer);
    }

    // Track whether the subscription is still active
    let isActive = true;

    // Subscribe to the source observable with custom operator subscriber
    sourceObservable.subscribe(
      Sy9.createOperatorSubscriber(
        destinationSubscriber,
        // next handler
        (value) => {
          if (observer.next) {
            observer.next.call(observer, value);
          }
          destinationSubscriber.next(value);
        },
        // complete handler
        () => {
          isActive = false;
          if (observer.complete) {
            observer.complete.call(observer);
          }
          destinationSubscriber.complete();
        },
        // error handler
        (error) => {
          isActive = false;
          if (observer.error) {
            observer.error.call(observer, error);
          }
          destinationSubscriber.error(error);
        },
        // finalize handler
        () => {
          // Only call unsubscribe if the subscription is still active
          if (isActive && observer.unsubscribe) {
            observer.unsubscribe.call(observer);
          }
          if (observer.finalize) {
            observer.finalize.call(observer);
          }
        }
      )
    );
  });
}

module.exports = createOperatorWithObserver;