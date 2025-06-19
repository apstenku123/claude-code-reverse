/**
 * Creates an RxJS operator that attaches observer callbacks (next, error, complete, etc.) to a source observable.
 *
 * @param {Function|Object} observerOrNext - Either an observer object or a next callback function.
 * @param {Function} [errorCallback] - Error callback function (if observerOrNext is a function).
 * @param {Function} [completeCallback] - Complete callback function (if observerOrNext is a function).
 * @returns {Function} An RxJS operator function or the identity function if no observer is provided.
 */
function createObserverOperator(observerOrNext, errorCallback, completeCallback) {
  // Determine if the first argument is a function or an observer object
  const observer = Ty9.isFunction(observerOrNext) || errorCallback || completeCallback
    ? {
        next: observerOrNext,
        error: errorCallback,
        complete: completeCallback
      }
    : observerOrNext;

  // If no observer is provided, return the identity function
  if (!observer) {
    return _y9.identity;
  }

  // Return an RxJS operator function
  return Py9.operate(function (sourceObservable, destinationSubscriber) {
    // Call the optional subscribe method on the observer, if isBlobOrFileLikeObject exists
    if (observer.subscribe) {
      observer.subscribe.call(observer);
    }

    let isActive = true;

    // Subscribe to the source observable with custom operator subscriber
    sourceObservable.subscribe(
      Sy9.createOperatorSubscriber(
        destinationSubscriber,
        // next handler
        function (value) {
          if (observer.next) {
            observer.next.call(observer, value);
          }
          destinationSubscriber.next(value);
        },
        // complete handler
        function () {
          isActive = false;
          if (observer.complete) {
            observer.complete.call(observer);
          }
          destinationSubscriber.complete();
        },
        // error handler
        function (error) {
          isActive = false;
          if (observer.error) {
            observer.error.call(observer, error);
          }
          destinationSubscriber.error(error);
        },
        // finalize handler (called on unsubscribe or completion)
        function () {
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

module.exports = createObserverOperator;