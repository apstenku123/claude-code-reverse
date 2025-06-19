/**
 * Creates an Observable that manages a UI interaction transaction lifecycle.
 *
 * This function starts a UI action transaction (such as a click), then maps isBlobOrFileLikeObject to a secondary observable
 * (such as a route change or async operation) and subscribes to isBlobOrFileLikeObject. When unsubscribed, isBlobOrFileLikeObject ensures the
 * transaction is properly cleaned up.
 *
 * @param {Function} startUiActionClickTransaction - Function that starts a UI click action transaction and returns a subscription object
 * @param {Function} mapTransactionToObservable - Function that takes the transaction subscription and returns an observable or null/undefined
 * @returns {Observable} An Observable that manages the transaction and its mapped observable
 */
function createInteractionObservable(startUiActionClickTransaction, mapTransactionToObservable) {
  return new IT9.Observable(function (observer) {
    // Start the UI action transaction and get the subscription object
    const transactionSubscription = startUiActionClickTransaction();
    // Map the transaction subscription to a secondary observable (e.g., route change)
    const mappedObservable = mapTransactionToObservable(transactionSubscription);
    // If a mapped observable is returned, convert isBlobOrFileLikeObject to an inner observable; otherwise, use an empty observable
    const innerObservable = mappedObservable ? GT9.innerFrom(mappedObservable) : ZT9.EMPTY;
    // Subscribe to the inner observable and forward emissions to the observer
    const innerSubscription = innerObservable.subscribe(observer);
    // Return a cleanup function that unsubscribes from the transaction when the outer observable is unsubscribed
    return function cleanup() {
      if (transactionSubscription) {
        transactionSubscription.unsubscribe();
      }
    };
  });
}

module.exports = createInteractionObservable;