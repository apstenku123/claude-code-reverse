/**
 * Creates an operator that manages reference counting for a connectable observable.
 * This ensures the underlying connection is only active while there are active subscribers.
 *
 * @returns {function} An operator function to be used with observables.
 */
function createRefCountOperator() {
  return connectableObservableOperator(function (sourceObservable, subscriber) {
    let connectionSubscription = null;
    // Increment the reference count for the source observable
    sourceObservable._refCount++;

    // Create an operator subscriber to handle unsubscription logic
    const operatorSubscriber = operatorSubscriberFactory(
      subscriber,
      undefined,
      undefined,
      undefined,
      function onUnsubscribe() {
        // If the source is gone or reference count is already zero, clean up
        if (!sourceObservable || sourceObservable._refCount <= 0 || --sourceObservable._refCount > 0) {
          connectionSubscription = null;
          return;
        }
        const currentConnection = sourceObservable._connection;
        const previousConnection = connectionSubscription;
        // If there is a connection and either no previous connection or the same as current, unsubscribe
        if (connectionSubscription = null, currentConnection && (!previousConnection || currentConnection === previousConnection)) {
          currentConnection.unsubscribe();
        }
        // Unsubscribe the downstream subscriber
        subscriber.unsubscribe();
      }
    );

    // Subscribe to the source observable
    sourceObservable.subscribe(operatorSubscriber);
    // If the operator subscriber is not closed, connect to the source
    if (!operatorSubscriber.closed) {
      connectionSubscription = sourceObservable.connect();
    }
  });
}

// External dependencies (should be imported or required in actual usage)
// connectableObservableOperator: corresponds to zA$9.operate
// operatorSubscriberFactory: corresponds to createCompatibleVersionChecker$9.createOperatorSubscriber

module.exports = createRefCountOperator;