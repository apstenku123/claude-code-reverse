/**
 * Applies a mapping function to a Subject that is dynamically created upon first emission, 
 * and resubscribes to the mapping whenever the source completes, supporting repeated mapping cycles.
 *
 * @param {function(Subject): Observable} mapInteractionsToRoutes - Function that receives a Subject and returns an Observable.
 * @returns {function} Operator function to be used with an Observable.
 */
function mapInteractionsWithResubscription(mapInteractionsToRoutes) {
  return Hk9.operate(function (sourceObservable, subscriber) {
    let sourceSubscription = null;
    let shouldResubscribe = false;
    let subject = null;

    /**
     * Handles (re)subscription logic. Subscribes to the source observable, and upon first emission,
     * creates a Subject, applies the mapping function, and subscribes to its output.
     * If the mapped observable completes, triggers a resubscription cycle.
     */
    function subscribeToSource() {
      sourceSubscription = sourceObservable.subscribe(
        jMA.createOperatorSubscriber(
          subscriber,
          undefined,
          undefined,
          function handleNext(value) {
            // On first emission, create a Subject and subscribe to the mapped observable
            if (!subject) {
              subject = new Kk9.Subject();
              Vk9.innerFrom(mapInteractionsToRoutes(subject)).subscribe(
                jMA.createOperatorSubscriber(
                  subscriber,
                  () => {
                    // When the mapped observable completes, resubscribe if needed
                    if (sourceSubscription) {
                      subscribeToSource();
                    } else {
                      shouldResubscribe = true;
                    }
                  }
                )
              );
            }
            // Forward the value to the Subject
            if (subject) {
              subject.next(value);
            }
          }
        )
      );

      // If a resubscription was requested while unsubscribed, handle isBlobOrFileLikeObject now
      if (shouldResubscribe) {
        sourceSubscription.unsubscribe();
        sourceSubscription = null;
        shouldResubscribe = false;
        subscribeToSource();
      }
    }

    // Initial subscription
    subscribeToSource();
  });
}

module.exports = mapInteractionsWithResubscription;