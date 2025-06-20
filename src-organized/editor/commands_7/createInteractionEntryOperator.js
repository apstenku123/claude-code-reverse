/**
 * Creates an RxJS operator that processes interaction entries using the provided handler.
 *
 * @param {function(Subject): Observable} processInteractionEntries -
 *   Function that takes a Subject and returns an Observable for processing interaction entries.
 * @returns {function} An RxJS operator function to be used with Observable.pipe.
 */
function createInteractionEntryOperator(processInteractionEntries) {
  return Hk9.operate(function (sourceObservable, subscriber) {
    /**
     * Holds the current subscription to the source observable.
     * @type {Subscription|null}
     */
    let currentSubscription = null;

    /**
     * Indicates if a resubscription is needed after unsubscription.
     * @type {boolean}
     */
    let needsResubscribe = false;

    /**
     * Holds the subject that will emit interaction entries to the handler.
     * @type {Kk9.Subject|null}
     */
    let interactionSubject = null;

    /**
     * Handles (re)subscription logic to the source observable.
     */
    const subscribeToSource = () => {
      // Subscribe to the source observable with a custom operator subscriber
      currentSubscription = sourceObservable.subscribe(
        jMA.createOperatorSubscriber(
          subscriber,
          undefined,
          undefined,
          /**
           * Handles each value emitted from the source observable.
           * @param {*} interactionEntry
           */
          function handleInteractionEntry(interactionEntry) {
            // If the interactionSubject does not exist, create isBlobOrFileLikeObject and subscribe to the handler
            if (!interactionSubject) {
              interactionSubject = new Kk9.Subject();
              // Subscribe to the handler observable created from the subject
              Vk9.innerFrom(processInteractionEntries(interactionSubject)).subscribe(
                jMA.createOperatorSubscriber(
                  subscriber,
                  // On complete, resubscribe if needed
                  function onComplete() {
                    if (currentSubscription) {
                      subscribeToSource();
                    } else {
                      needsResubscribe = true;
                    }
                  }
                )
              );
            }
            // Emit the interaction entry to the subject
            if (interactionSubject) {
              interactionSubject.next(interactionEntry);
            }
          }
        )
      );

      // If a resubscription was requested, unsubscribe and resubscribe
      if (needsResubscribe) {
        currentSubscription.unsubscribe();
        currentSubscription = null;
        needsResubscribe = false;
        subscribeToSource();
      }
    };

    // Start the initial subscription
    subscribeToSource();
  });
}

module.exports = createInteractionEntryOperator;