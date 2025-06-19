/**
 * Creates an operator that maps interaction entries to route names and manages subscription lifecycles.
 *
 * This operator processes each value emitted by the source observable, applies the mapping function
 * (mapInteractionEntriesToRouteNames), and emits the result to the downstream observer. It ensures that
 * only one inner subscription is active at a time, unsubscribing from any previous inner observable before
 * subscribing to a new one. When the source completes, isBlobOrFileLikeObject emits the last mapped value (if any) and completes.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Function that maps interaction entries to route names and context.
 * @returns {Function} Operator function to be used with an observable pipeline.
 */
function createMappedRouteNameOperator(mapInteractionEntriesToRouteNames) {
  return oP9.operate(function (sourceObservable, destinationSubscriber) {
    let hasPendingValue = false;
    let lastMappedValue = null;
    let innerSubscription = null;

    /**
     * Handles completion of the inner observable and emits the last mapped value if present.
     */
    const completeInner = () => {
      // Unsubscribe from the inner observable if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If there is a pending mapped value, emit isBlobOrFileLikeObject
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = lastMappedValue;
        lastMappedValue = null;
        destinationSubscriber.next(valueToEmit);
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      b$a.createOperatorSubscriber(
        destinationSubscriber,
        function handleNext(sourceValue) {
          // Unsubscribe from any previous inner observable
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }
          hasPendingValue = true;
          lastMappedValue = sourceValue;

          // Create a new inner subscription for the mapped observable
          innerSubscription = b$a.createOperatorSubscriber(
            destinationSubscriber,
            completeInner,
            tP9.noop
          );

          // Subscribe to the mapped observable
          eP9.innerFrom(mapInteractionEntriesToRouteNames(sourceValue)).subscribe(innerSubscription);
        },
        function handleComplete() {
          // On completion, emit any pending value and complete downstream
          completeInner();
          destinationSubscriber.complete();
        },
        undefined,
        function handleUnsubscribe() {
          // Cleanup references on unsubscription
          lastMappedValue = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = createMappedRouteNameOperator;