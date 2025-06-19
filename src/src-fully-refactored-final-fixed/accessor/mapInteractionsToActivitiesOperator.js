/**
 * Operator function that maps user interaction entries to route activities, managing their lifecycle and completion.
 *
 * @param {function} mapInteractionsToRoutes - Function that processes a user interaction and returns an Observable of route names.
 * @param {function} [addActivityIfNotFinished] - Optional function to add an activity if the process is not finished.
 * @returns {function} Operator function to be used with an Observable pipeline.
 */
function mapInteractionsToActivitiesOperator(mapInteractionsToRoutes, addActivityIfNotFinished) {
  return Fy9.operate(function (sourceObservable, destinationSubscriber) {
    let innerSubscription = null; // Tracks the current inner subscription
    let interactionIndex = 0;     // Tracks the index of the current interaction
    let isSourceComplete = false; // Indicates if the source observable has completed

    /**
     * Checks if both the source is complete and there is no active inner subscription,
     * then completes the destination subscriber.
     */
    const completeIfDone = () => {
      if (isSourceComplete && !innerSubscription) {
        destinationSubscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      WLA.createOperatorSubscriber(
        destinationSubscriber,
        function handleInteraction(interaction) {
          // Unsubscribe from any previous inner subscription
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }

          let routeEmissionIndex = 0;
          const currentInteractionIndex = interactionIndex++;

          // Map the interaction to a route observable and subscribe to isBlobOrFileLikeObject
          Wy9.innerFrom(mapInteractionsToRoutes(interaction, currentInteractionIndex)).subscribe(
            innerSubscription = WLA.createOperatorSubscriber(
              destinationSubscriber,
              function handleRoute(route) {
                // Emit the mapped activity or the route itself
                if (addActivityIfNotFinished) {
                  destinationSubscriber.next(
                    addActivityIfNotFinished(interaction, route, currentInteractionIndex, routeEmissionIndex++)
                  );
                } else {
                  destinationSubscriber.next(route);
                }
              },
              function handleInnerComplete() {
                // Clear the inner subscription and check for completion
                innerSubscription = null;
                completeIfDone();
              }
            )
          );
        },
        function handleSourceComplete() {
          // Mark the source as complete and check for completion
          isSourceComplete = true;
          completeIfDone();
        }
      )
    );
  });
}

module.exports = mapInteractionsToActivitiesOperator;