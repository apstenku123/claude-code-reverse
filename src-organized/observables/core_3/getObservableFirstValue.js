/**
 * Returns a Promise that resolves with the first emitted value from the given Observable.
 *
 * @param {Observable<any>} sourceObservable - The Observable to subscribe to.
 * @returns {Promise<any>} Promise that resolves with the first emitted value from the Observable.
 */
function getObservableFirstValue(sourceObservable) {
  return new Promise((resolve, reject) => {
    // Subscribe to the Observable
    const subscription = sourceObservable.subscribe({
      next: (value) => {
        // Resolve the promise with the first value and unsubscribe
        resolve(value);
        subscription.unsubscribe();
      },
      error: (error) => {
        // Reject the promise if an error occurs
        reject(error);
      },
      complete: () => {
        // If the Observable completes without emitting, resolve with undefined
        resolve(undefined);
      }
    });
  });
}

module.exports = getObservableFirstValue;