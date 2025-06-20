/**
 * Applies a mapping function to user interaction entries, then adds an activity if not finished.
 *
 * This operator function subscribes to a source observable of user interactions, maps each interaction
 * to route names and context using the provided mapping function, and then, for each mapped result,
 * adds an activity via the provided callback if the process is not marked as finished.
 *
 * @param {function} mapInteractionsToRouteNames - Function that maps a user interaction entry and index to an observable of route/context pairs.
 * @param {function} [addActivityIfNotFinished] - Optional function to add an activity if the process is not finished. Receives (interaction, mappedValue, interactionIndex, mappedIndex).
 * @returns {function} Operator function to be used with an observable pipeline.
 */
function mapInteractionsAndAddActivityIfNotFinished(mapInteractionsToRouteNames, addActivityIfNotFinished) {
  return Fy9.operate(function (sourceObservable, destinationSubscriber) {
    let innerSubscription = null;
    let interactionIndex = 0;
    let isSourceComplete = false;

    /**
     * Checks if the source is complete and there is no active inner subscription.
     * If so, completes the destination subscriber.
     */
    const checkComplete = () => {
      if (isSourceComplete && !innerSubscription) {
        destinationSubscriber.complete();
      }
    };

    sourceObservable.subscribe(
      WLA.createOperatorSubscriber(
        destinationSubscriber,
        function handleInteraction(interaction) {
          // Unsubscribe from any previous inner subscription
          if (innerSubscription) {
            innerSubscription.unsubscribe();
          }

          let mappedIndex = 0;
          const currentInteractionIndex = interactionIndex++;

          // Map the interaction to an observable of mapped values (route/context pairs)
          Wy9.innerFrom(mapInteractionsToRouteNames(interaction, currentInteractionIndex)).subscribe(
            innerSubscription = WLA.createOperatorSubscriber(
              destinationSubscriber,
              function handleMappedValue(mappedValue) {
                // If addActivityIfNotFinished is provided, use isBlobOrFileLikeObject; otherwise, emit the mapped value directly
                if (addActivityIfNotFinished) {
                  destinationSubscriber.next(
                    addActivityIfNotFinished(
                      interaction,
                      mappedValue,
                      currentInteractionIndex,
                      mappedIndex++
                    )
                  );
                } else {
                  destinationSubscriber.next(mappedValue);
                  mappedIndex++;
                }
              },
              function handleInnerComplete() {
                // Clear inner subscription and check if handleMissingDoctypeError should complete
                innerSubscription = null;
                checkComplete();
              }
            )
          );
        },
        function handleSourceComplete() {
          isSourceComplete = true;
          checkComplete();
        }
      )
    );
  });
}

module.exports = mapInteractionsAndAddActivityIfNotFinished;