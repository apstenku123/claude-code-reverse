/**
 * Creates an RxJS operator that maps user interaction entries to route names and manages their aggregation.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes an observable of interaction entries and returns an observable of mapped routes.
 * @returns {Function} An RxJS operator function to be used with pipe.
 */
function createInteractionRouteMappingOperator(mapInteractionsToRoutes) {
  return Hk9.operate(function (sourceObservable, subscriber) {
    let currentSubscription;
    let isResubscribing = false;
    let subjectInstance;

    /**
     * Handles (re)subscription logic for the operator.
     */
    const resubscribe = function () {
      // Subscribe to the source observable
      currentSubscription = sourceObservable.subscribe(
        jMA.createOperatorSubscriber(
          subscriber,
          undefined,
          undefined,
          function handleNext(interactionEntry) {
            // Lazily create a subject and subscribe to the mapped observable
            if (!subjectInstance) {
              subjectInstance = new Kk9.Subject();
              Vk9.innerFrom(mapInteractionsToRoutes(subjectInstance)).subscribe(
                jMA.createOperatorSubscriber(
                  subscriber,
                  function handleComplete() {
                    // On completion, resubscribe if needed
                    if (currentSubscription) {
                      resubscribe();
                    } else {
                      isResubscribing = true;
                    }
                  }
                )
              );
            }
            // Forward the interaction entry to the subject
            if (subjectInstance) {
              subjectInstance.next(interactionEntry);
            }
          }
        )
      );

      // If a resubscription was requested during unsubscription, handle isBlobOrFileLikeObject now
      if (isResubscribing) {
        currentSubscription.unsubscribe();
        currentSubscription = null;
        isResubscribing = false;
        resubscribe();
      }
    };

    // Start the initial subscription
    resubscribe();
  });
}

module.exports = createInteractionRouteMappingOperator;