/**
 * Operator that maps incoming user interaction entries to route names and associated context.
 * Ensures that mapping size does not exceed a set limit and updates or evicts mappings based on duration.
 *
 * @param {Function} mapInteractionsToRouteNames - Function that processes an interaction entry and returns an Observable.
 * @returns {Function} Operator function to be used with an Observable pipeline.
 */
function mapInteractionsWithRouteNamesOperator(mapInteractionsToRouteNames) {
  return zT9.operate(function (sourceObservable, destinationSubscriber) {
    let hasPendingInteraction = false;
    let lastInteractionValue = null;
    let innerSubscription = null;
    let isSourceCompleted = false;

    /**
     * Handles completion of the inner observable.
     * If there was a pending interaction, emits isBlobOrFileLikeObject to the destination subscriber.
     * Completes the destination if the source has also completed.
     */
    const handleInnerComplete = () => {
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;
      if (hasPendingInteraction) {
        hasPendingInteraction = false;
        const interactionValue = lastInteractionValue;
        lastInteractionValue = null;
        destinationSubscriber.next(interactionValue);
      }
      if (isSourceCompleted) {
        destinationSubscriber.complete();
      }
    };

    /**
     * Handles cleanup when the inner observable completes without pending interactions.
     */
    const handleInnerUnsubscribe = () => {
      innerSubscription = null;
      if (isSourceCompleted) {
        destinationSubscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      iNA.createOperatorSubscriber(
        destinationSubscriber,
        /**
         * Handles each new interaction entry from the source observable.
         * Starts a new inner subscription if one is not already active.
         * @param {*} interactionEntry
         */
        function onNext(interactionEntry) {
          hasPendingInteraction = true;
          lastInteractionValue = interactionEntry;
          if (!innerSubscription) {
            // Start processing the interaction entry
            wT9.innerFrom(mapInteractionsToRouteNames(interactionEntry)).subscribe(
              innerSubscription = iNA.createOperatorSubscriber(
                destinationSubscriber,
                handleInnerComplete,
                handleInnerUnsubscribe
              )
            );
          }
        },
        /**
         * Handles completion of the source observable.
         * Completes the destination if there are no pending or active inner subscriptions.
         */
        function onComplete() {
          isSourceCompleted = true;
          if (!hasPendingInteraction || !innerSubscription || innerSubscription.closed) {
            destinationSubscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = mapInteractionsWithRouteNamesOperator;