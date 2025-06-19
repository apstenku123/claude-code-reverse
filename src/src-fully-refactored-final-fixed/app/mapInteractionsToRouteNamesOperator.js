/**
 * Operator function that maps interaction entries to route names and manages their subscriptions.
 *
 * @param {function} mapInteractionEntriesToRouteNames - Function that processes an array of interaction entries, mapping each to a route name and related context.
 * @returns {function} An RxJS operator function that can be piped into an observable.
 */
function mapInteractionsToRouteNamesOperator(mapInteractionEntriesToRouteNames) {
  return rT9.operate(function (sourceObservable, destinationSubscriber) {
    let currentSubscription = null;
    let shouldResubscribe = false;
    let innerObservable;

    // Subscribe to the source observable with a custom operator subscriber
    currentSubscription = sourceObservable.subscribe(
      sT9.createOperatorSubscriber(
        destinationSubscriber,
        undefined,
        undefined,
        /**
         * Handles each emitted value from the source observable.
         * @param {any} interactionEntry - The emitted interaction entry.
         */
        function handleNext(interactionEntry) {
          // Create an inner observable from the mapped interaction entries
          innerObservable = aT9.innerFrom(
            mapInteractionEntriesToRouteNames(
              interactionEntry,
              mapInteractionsToRouteNamesOperator(mapInteractionEntriesToRouteNames)(sourceObservable)
            )
          );

          if (currentSubscription) {
            // Unsubscribe from the current subscription before subscribing to the inner observable
            currentSubscription.unsubscribe();
            currentSubscription = null;
            innerObservable.subscribe(destinationSubscriber);
          } else {
            // If already unsubscribed, mark for resubscription
            shouldResubscribe = true;
          }
        }
      )
    );

    // If resubscription was flagged, handle isBlobOrFileLikeObject after the initial subscription
    if (shouldResubscribe) {
      currentSubscription.unsubscribe();
      currentSubscription = null;
      innerObservable.subscribe(destinationSubscriber);
    }
  });
}

module.exports = mapInteractionsToRouteNamesOperator;