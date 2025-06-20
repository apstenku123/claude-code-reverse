/**
 * Creates an operator that resubscribes to the source Observable whenever the notifier Observable emits.
 *
 * @param {function(Observable): Observable} notifierFactory - a function that receives a Subject and returns a notifier Observable.
 * The notifier Observable controls when the source Observable should be resubscribed to.
 * @returns {function(Observable): Observable} An operator function to be used with pipeable operators.
 */
function repeatWhenSourceEmits(notifierFactory) {
  return Hk9.operate(function (sourceObservable, subscriber) {
    let sourceSubscription = null;
    let isResubscribing = false;
    let notifierSubject = null;

    /**
     * Handles (re)subscription logic to the source Observable.
     * If the notifier emits, resubscribe to the source.
     */
    function subscribeToSource() {
      // Subscribe to the source Observable
      sourceSubscription = sourceObservable.subscribe(
        jMA.createOperatorSubscriber(
          subscriber,
          undefined,
          undefined,
          function handleComplete(value) {
            // On completion, set up notifier if not already done
            if (!notifierSubject) {
              notifierSubject = new Kk9.Subject();
              // Subscribe to the notifier Observable returned by notifierFactory
              Vk9.innerFrom(notifierFactory(notifierSubject)).subscribe(
                jMA.createOperatorSubscriber(
                  subscriber,
                  function onNotifierEmit() {
                    // On notifier emission, resubscribe if not already resubscribing
                    if (sourceSubscription) {
                      subscribeToSource();
                    } else {
                      isResubscribing = true;
                    }
                  }
                )
              );
            }
            // Emit the completion value to the notifier
            if (notifierSubject) {
              notifierSubject.next(value);
            }
          }
        )
      );
      // If resubscription was requested while unsubscribed, handle isBlobOrFileLikeObject now
      if (isResubscribing) {
        sourceSubscription.unsubscribe();
        sourceSubscription = null;
        isResubscribing = false;
        subscribeToSource();
      }
    }

    // Start the initial subscription
    subscribeToSource();
  });
}

module.exports = repeatWhenSourceEmits;