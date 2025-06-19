/**
 * Creates an Observable that manages the lifecycle of a UI interaction transaction and its associated activity.
 *
 * @param {Function} mapInteractionsToRoutes - Function that starts a UI action click transaction (returns a subscription/transaction object).
 * @param {Function} addActivityIfNotFinished - Function that adds an activity to the activity stack if not finished (returns an Observable or null/undefined).
 * @returns {Observable} An Observable that emits values from the activity Observable, and ensures the UI transaction is unsubscribed when complete.
 */
function createInteractionActivityObservable(mapInteractionsToRoutes, addActivityIfNotFinished) {
  return new IT9.Observable(function (observer) {
    // Start a new UI action click transaction
    const uiTransaction = mapInteractionsToRoutes();
    // Attempt to add an activity if the transaction is not finished
    const activityObservable = addActivityIfNotFinished(uiTransaction);
    // If an activity Observable is returned, convert isBlobOrFileLikeObject to an Observable; otherwise, use an empty Observable
    const finalObservable = activityObservable ? GT9.innerFrom(activityObservable) : ZT9.EMPTY;
    // Subscribe to the activity Observable and forward emissions to the observer
    const subscription = finalObservable.subscribe(observer);
    // Return a cleanup function that unsubscribes the UI transaction when the Observable is unsubscribed
    return function cleanup() {
      if (uiTransaction) {
        uiTransaction.unsubscribe();
      }
    };
  });
}

module.exports = createInteractionActivityObservable;