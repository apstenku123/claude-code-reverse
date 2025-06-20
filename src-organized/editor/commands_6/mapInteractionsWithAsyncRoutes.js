/**
 * Maps user interaction events to asynchronous route observables, ensuring that only the latest interaction is processed.
 * Handles completion and cleanup logic for inner subscriptions, forwarding results to the downstream subscriber.
 *
 * @param {Function} mapInteractionsToRoutes - Function that maps an interaction event to an Observable of route data.
 * @returns {Function} Operator function to be used with an Observable pipeline.
 */
function mapInteractionsWithAsyncRoutes(mapInteractionsToRoutes) {
  return zT9.operate(function (sourceObservable, downstreamSubscriber) {
    let hasActiveInteraction = false;
    let latestInteractionValue = null;
    let innerSubscription = null;
    let sourceCompleted = false;

    /**
     * Handles completion of the inner observable.
     * If there was an active interaction, emits its value downstream.
     * Completes downstream if the source has also completed.
     */
    const handleInnerComplete = function () {
      // Unsubscribe and clear inner subscription
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      if (hasActiveInteraction) {
        hasActiveInteraction = false;
        const valueToEmit = latestInteractionValue;
        latestInteractionValue = null;
        downstreamSubscriber.next(valueToEmit);
      }
      // If the source has completed, complete downstream
      if (sourceCompleted) {
        downstreamSubscriber.complete();
      }
    };

    /**
     * Handles cleanup when the inner observable completes without emitting.
     * Completes downstream if the source has also completed.
     */
    const handleInnerFinalize = function () {
      innerSubscription = null;
      if (sourceCompleted) {
        downstreamSubscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      iNA.createOperatorSubscriber(
        downstreamSubscriber,
        function onNext(interactionEvent) {
          hasActiveInteraction = true;
          latestInteractionValue = interactionEvent;

          // If there is no active inner subscription, start one
          if (!innerSubscription) {
            const routeObservable = wT9.innerFrom(mapInteractionsToRoutes(interactionEvent));
            innerSubscription = routeObservable.subscribe(
              iNA.createOperatorSubscriber(
                downstreamSubscriber,
                handleInnerComplete,
                handleInnerFinalize
              )
            );
          }
        },
        function onComplete() {
          sourceCompleted = true;
          // If there is no active interaction or the inner subscription is closed, complete downstream
          if (!hasActiveInteraction || !innerSubscription || innerSubscription.closed) {
            downstreamSubscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = mapInteractionsWithAsyncRoutes;