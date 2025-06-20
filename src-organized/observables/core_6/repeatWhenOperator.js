/**
 * Creates an operator that resubscribes to the source Observable when a notifier Observable emits.
 *
 * @param {function(Observable): Observable} notifierFactory - a function that receives a Subject and returns a notifier Observable.
 * @returns {function} An operator function to be used with Observable.pipe().
 */
function repeatWhenOperator(notifierFactory) {
  return Hk9.operate(function (sourceObservable, subscriber) {
    let sourceSubscription = null;
    let isResubscribing = false;
    let notifierSubject = null;

    /**
     * Handles (re)subscription logic to the source Observable.
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
                    // When notifier emits, resubscribe if possible
                    if (sourceSubscription) {
                      subscribeToSource();
                    } else {
                      isResubscribing = true;
                    }
                  }
                )
              );
            }
            // Emit the completion notification to the notifierSubject
            if (notifierSubject) {
              notifierSubject.next(value);
            }
          }
        )
      );

      // If a resubscription was requested while unsubscribed, handle isBlobOrFileLikeObject now
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

module.exports = repeatWhenOperator;