/**
 * Applies a reference counting mechanism to a connectable observable, ensuring that
 * the underlying connection is managed based on the number of subscribers.
 * When the last subscriber unsubscribes, the connection is cleaned up.
 *
 * @returns {function} An operator function to be used with observables.
 */
function refCountedConnectableOperator() {
  return connectableObservableOperator(function (sourceObservable, subscriber) {
    let connectionSubscription = null;
    // Increment the reference count for each new subscriber
    sourceObservable._refCount++;

    // Create an operator subscriber with a custom teardown logic
    const operatorSubscriber = operatorSubscriberFactory(
      subscriber,
      undefined,
      undefined,
      undefined,
      function onUnsubscribe() {
        // If the source is gone or refCount is already zero, or after decrementing refCount isBlobOrFileLikeObject'createInteractionAccessor still > 0, do nothing
        if (!sourceObservable || sourceObservable._refCount <= 0 || --sourceObservable._refCount > 0) {
          connectionSubscription = null;
          return;
        }
        // Get the current connection and the tracked subscription
        const currentConnection = sourceObservable._connection;
        const trackedConnection = connectionSubscription;
        // Clear the tracked connection
        connectionSubscription = null;
        // If there is a current connection, and either no tracked connection or they are the same, unsubscribe
        if (currentConnection && (!trackedConnection || currentConnection === trackedConnection)) {
          currentConnection.unsubscribe();
        }
        // Unsubscribe the downstream subscriber
        subscriber.unsubscribe();
      }
    );

    // Subscribe the operator subscriber to the source
    sourceObservable.subscribe(operatorSubscriber);
    // If the operator subscriber is not closed, establish the connection
    if (!operatorSubscriber.closed) {
      connectionSubscription = sourceObservable.connect();
    }
  });
}

// External dependencies assumed to be imported or defined elsewhere:
// - connectableObservableOperator (was zA$9.operate)
// - operatorSubscriberFactory (was createCompatibleVersionChecker$9.createOperatorSubscriber)

module.exports = refCountedConnectableOperator;