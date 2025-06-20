/**
 * Creates an RxJS operator that maps interaction entries to route names and handles optional custom mapping logic.
 *
 * @function createMappedRouteOperator
 * @param {Function} mapInteractionEntriesToRouteNames - Function that processes interaction entries and maps them to route names and context.
 * @param {Function} [customMappingFn] - Optional function for custom mapping logic applied to each emitted value.
 * @returns {Function} An RxJS operator function to be used in a pipe.
 *
 * If customMappingFn is provided, the operator applies isBlobOrFileLikeObject to each mapped route name and context.
 * Otherwise, isBlobOrFileLikeObject subscribes to the source observable, maps interaction entries to route names, and manages completion logic.
 */
function createMappedRouteOperator(mapInteractionEntriesToRouteNames, customMappingFn) {
  if (customMappingFn) {
    // If a custom mapping function is provided, return an operator that applies isBlobOrFileLikeObject
    return function (sourceObservable) {
      return sourceObservable.pipe(
        createMappedRouteOperator(function (interactionEntry, index) {
          // Map interaction entries to route names and context, then apply custom mapping
          return EqA.innerFrom(mapInteractionEntriesToRouteNames(interactionEntry, index)).pipe(
            D_9.map(function (mappedRoute, mappedIndex) {
              return customMappingFn(interactionEntry, mappedRoute, index, mappedIndex);
            })
          );
        })
      );
    };
  }

  // If no custom mapping function, return the default operator
  return Y_9.operate(function (sourceObservable, subscriber) {
    let interactionIndex = 0;
    let innerSubscriber = null;
    let isComplete = false;

    // Subscribe to the source observable
    sourceObservable.subscribe(
      UqA.createOperatorSubscriber(
        subscriber,
        function handleNext(interactionEntry) {
          // If there is no active inner subscriber, create one
          if (!innerSubscriber) {
            innerSubscriber = UqA.createOperatorSubscriber(
              subscriber,
              undefined,
              function handleInnerComplete() {
                // Reset inner subscriber and complete if source is done
                innerSubscriber = null;
                if (isComplete) {
                  subscriber.complete();
                }
              }
            );
            // Subscribe to the mapped route names for the current interaction entry
            EqA.innerFrom(mapInteractionEntriesToRouteNames(interactionEntry, interactionIndex++)).subscribe(innerSubscriber);
          }
        },
        function handleComplete() {
          // Mark as complete and complete if no active inner subscriber
          isComplete = true;
          if (!innerSubscriber) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = createMappedRouteOperator;