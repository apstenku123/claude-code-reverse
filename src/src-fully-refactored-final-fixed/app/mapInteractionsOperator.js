/**
 * Applies a custom operator to an Observable, mapping user interactions to routes and handling subscription logic.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes user interactions and maps them to route names with metadata.
 * @returns {Function} Operator function to be used with Observable'createInteractionAccessor pipe method.
 */
function mapInteractionsOperator(mapInteractionsToRoutes) {
  return rT9.operate(function (sourceObservable, destinationSubscriber) {
    let currentSubscription = null;
    let shouldResubscribe = false;
    let innerObservable = undefined;

    // Subscribe to the source observable with a custom operator subscriber
    currentSubscription = sourceObservable.subscribe(
      sT9.createOperatorSubscriber(
        destinationSubscriber,
        undefined,
        undefined,
        /**
         * Handles each emitted value from the source observable.
         * @param {any} interactionEntry - The emitted value representing a user interaction.
         */
        function handleInteraction(interactionEntry) {
          // Create a new observable from the mapped interaction
          innerObservable = aT9.innerFrom(
            mapInteractionsToRoutes(
              interactionEntry,
              mapInteractionsOperator(mapInteractionsToRoutes)(sourceObservable)
            )
          );

          if (currentSubscription) {
            // Unsubscribe from the current subscription before subscribing to the new observable
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

    // If resubscription is needed after the initial emission, handle isBlobOrFileLikeObject here
    if (shouldResubscribe) {
      if (currentSubscription) {
        currentSubscription.unsubscribe();
        currentSubscription = null;
      }
      if (innerObservable) {
        innerObservable.subscribe(destinationSubscriber);
      }
    }
  });
}

module.exports = mapInteractionsOperator;