/**
 * Converts a Promise into an RxJS Observable.
 *
 * This function creates a new Observable that emits the resolved value of the provided Promise,
 * completes after emitting, or emits an error if the Promise is rejected. If the subscriber
 * unsubscribes before the Promise settles, no value is emitted.
 *
 * @param {Promise<any>} promise - The Promise to convert into an Observable.
 * @returns {Observable<any>} An Observable that mirrors the resolution or rejection of the input Promise.
 */
function fromPromiseToObservable(promise) {
  return new zf.Observable(function (subscriber) {
    promise.then(
      function (resolvedValue) {
        // Only emit if the subscriber is still active
        if (!subscriber.closed) {
          subscriber.next(resolvedValue);
          subscriber.complete();
        }
      },
      function (error) {
        // Emit error if the Promise is rejected
        subscriber.error(error);
      }
    ).then(
      null,
      // Report unhandled errors that occur in the then/catch chain
      JM9.reportUnhandledError
    );
  });
}

module.exports = fromPromiseToObservable;
