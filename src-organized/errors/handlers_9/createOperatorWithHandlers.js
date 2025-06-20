/**
 * Creates an operator function that attaches next, error, and complete handlers to an observable stream.
 *
 * If the first argument is a function or any of the next/error/complete handlers are provided, isBlobOrFileLikeObject constructs a handler object.
 * Otherwise, isBlobOrFileLikeObject assumes the first argument is already a handler object.
 *
 * @param {Function|Object} nextOrObserver - Either a next handler function or an observer object with next, error, complete, etc.
 * @param {Function} [errorHandler] - Optional error handler function.
 * @param {Function} [completeHandler] - Optional complete handler function.
 * @returns {Function} An operator function to be used with an observable.
 */
function createOperatorWithHandlers(nextOrObserver, errorHandler, completeHandler) {
  // Determine the observer object based on arguments
  const observer = Ty9.isFunction(nextOrObserver) || errorHandler || completeHandler
    ? {
        next: nextOrObserver,
        error: errorHandler,
        complete: completeHandler
      }
    : nextOrObserver;

  // If no observer is provided, return the identity operator
  if (!observer) {
    return _y9.identity;
  }

  // Return an operator function that wires up the handlers
  return Py9.operate(function (sourceObservable, subscriber) {
    // Call the optional 'subscribe' method on the observer, if present
    if (observer.subscribe) {
      observer.subscribe.call(observer);
    }

    let isActive = true;

    // Subscribe to the source observable with custom handlers
    sourceObservable.subscribe(
      Sy9.createOperatorSubscriber(
        subscriber,
        // next handler
        function (value) {
          if (observer.next) {
            observer.next.call(observer, value);
          }
          subscriber.next(value);
        },
        // complete handler
        function () {
          isActive = false;
          if (observer.complete) {
            observer.complete.call(observer);
          }
          subscriber.complete();
        },
        // error handler
        function (error) {
          isActive = false;
          if (observer.error) {
            observer.error.call(observer, error);
          }
          subscriber.error(error);
        },
        // finalize handler
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

module.exports = createOperatorWithHandlers;