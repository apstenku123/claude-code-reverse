/**
 * Creates an RxJS operator that maps user interaction entries to route names and manages their aggregation.
 *
 * @param {Function} mapInteractionsToRouteNames - Function that processes an observable of user interaction entries,
 *   mapping each to a route name and associated context. Returns an observable.
 * @returns {Function} An RxJS operator function to be used with pipe(), which manages the mapping and aggregation logic.
 */
function getMappedRouteNamesOperator(mapInteractionsToRouteNames) {
  return Hk9.operate(function (sourceObservable, subscriber) {
    let currentSubscription;
    let isResubscribing = false;
    let subjectInstance;

    /**
     * Handles (re)subscription logic. If resubscription is needed, isBlobOrFileLikeObject will unsubscribe and resubscribe.
     */
    const handleSubscription = () => {
      // Subscribe to the source observable, using a custom operator subscriber
      currentSubscription = sourceObservable.subscribe(
        jMA.createOperatorSubscriber(
          subscriber,
          undefined,
          undefined,
          function handleNext(interactionEntry) {
            // On the first emission, create a new Subject and subscribe to the mapped observable
            if (!subjectInstance) {
              subjectInstance = new Kk9.Subject();
              Vk9.innerFrom(mapInteractionsToRouteNames(subjectInstance)).subscribe(
                jMA.createOperatorSubscriber(
                  subscriber,
                  function onCompleteOrResubscribe() {
                    // If the subscription is still active, resubscribe; otherwise, set flag to resubscribe later
                    if (currentSubscription) {
                      handleSubscription();
                    } else {
                      isResubscribing = true;
                    }
                  }
                )
              );
            }
            // Forward the interaction entry to the subject instance
            if (subjectInstance) {
              subjectInstance.next(interactionEntry);
            }
          }
        )
      );

      // If a resubscription was requested during teardown, handle isBlobOrFileLikeObject now
      if (isResubscribing) {
        currentSubscription.unsubscribe();
        currentSubscription = null;
        isResubscribing = false;
        handleSubscription();
      }
    };

    // Start the initial subscription
    handleSubscription();
  });
}

module.exports = getMappedRouteNamesOperator;
