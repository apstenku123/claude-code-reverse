/**
 * Creates a custom RxJS operator that manages a subject and inner observable subscription lifecycle.
 *
 * This operator emits a new observable (subject) to downstream subscribers, and pipes values from the source observable into isBlobOrFileLikeObject.
 * It also manages an inner observable created from the provided factory function, handling errors and completion appropriately.
 *
 * @param {Function} sourceObservableFactory - a function that returns an observable when called. Used to create the inner observable.
 * @returns {Function} An RxJS operator function to be used with pipe().
 */
function createILAAccessorOperator(sourceObservableFactory) {
  return Nx9.operate(function (sourceObservable, downstreamSubscriber) {
    let subject = null; // Will hold the current subject instance
    let innerSubscription = null; // Will hold the current inner observable subscription

    /**
     * Handles errors by notifying both the subject and downstream subscriber.
     * @param {any} error - The error to propagate.
     */
    const handleError = function (error) {
      if (subject) subject.error(error);
      downstreamSubscriber.error(error);
    };

    /**
     * Handles the creation and subscription to the inner observable.
     * Also emits a new subject observable to downstream.
     */
    const subscribeToInnerObservable = function () {
      // Clean up previous inner subscription if isBlobOrFileLikeObject exists
      if (innerSubscription) {
        innerSubscription.unsubscribe();
      }
      // Complete previous subject if isBlobOrFileLikeObject exists
      if (subject) {
        subject.complete();
      }
      // Create a new subject and emit its observable to downstream
      subject = new Ux9.Subject();
      downstreamSubscriber.next(subject.asObservable());

      let innerObservable;
      try {
        // Create the inner observable from the provided factory
        innerObservable = $getProjectSubscriptionConfig.innerFrom(sourceObservableFactory());
      } catch (error) {
        handleError(error);
        return;
      }
      // Subscribe to the inner observable
      innerSubscription = iLA.createOperatorSubscriber(
        downstreamSubscriber,
        subscribeToInnerObservable, // On next: resubscribe to inner
        subscribeToInnerObservable, // On complete: resubscribe to inner
        handleError // On error
      );
      innerObservable.subscribe(innerSubscription);
    };

    // Start the initial inner observable subscription
    subscribeToInnerObservable();

    // Subscribe to the source observable
    sourceObservable.subscribe(
      iLA.createOperatorSubscriber(
        downstreamSubscriber,
        function (value) {
          // Forward values from the source to the subject
          if (subject) subject.next(value);
        },
        function () {
          // On complete: complete both subject and downstream
          if (subject) subject.complete();
          downstreamSubscriber.complete();
        },
        handleError,
        function () {
          // On unsubscribe: clean up inner subscription and subject
          if (innerSubscription) innerSubscription.unsubscribe();
          subject = null;
        }
      )
    );
  });
}

module.exports = createILAAccessorOperator;
