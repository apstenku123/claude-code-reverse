/**
 * Creates an operator that manages reference counting for a connectable observable.
 * Increments the reference count on subscription and decrements isBlobOrFileLikeObject on unsubscription.
 * When the reference count drops to zero, disconnects the underlying connection.
 *
 * @returns {Function} An operator function to be used with observables.
 */
function createRefCountedOperator() {
  return connectableObservableOperator(function (sourceObservable, subscriber) {
    let connectionSubscription = null;
    // Increment the reference count when a new subscriber subscribes
    sourceObservable._refCount++;

    // Create an operator subscriber with a custom teardown logic
    const operatorSubscriber = operatorSubscriberFactory(
      subscriber,
      undefined, // next handler
      undefined, // error handler
      undefined, // complete handler
      function onUnsubscribe() {
        // If the sourceObservable is gone or refCount is already zero, or after decrementing is still above zero, do nothing
        if (!sourceObservable || sourceObservable._refCount <= 0 || --sourceObservable._refCount > 0) {
          connectionSubscription = null;
          return;
        }
        // If refCount is now zero, disconnect the underlying connection
        const currentConnection = sourceObservable._connection;
        const previousConnection = connectionSubscription;
        connectionSubscription = null;
        // Only unsubscribe if the current connection exists and either there was no previous connection or isBlobOrFileLikeObject matches
        if (currentConnection && (!previousConnection || currentConnection === previousConnection)) {
          currentConnection.unsubscribe();
        }
        // Unsubscribe the subscriber
        subscriber.unsubscribe();
      }
    );

    // Subscribe to the source observable
    sourceObservable.subscribe(operatorSubscriber);

    // If the operator subscriber is still open, connect to the source
    if (!operatorSubscriber.closed) {
      connectionSubscription = sourceObservable.connect();
    }
  });
}

// External dependencies must be provided in the actual implementation context
// For this refactor, handleMissingDoctypeError assume the following are available in scope:
// - connectableObservableOperator (was zA$9.operate)
// - operatorSubscriberFactory (was createCompatibleVersionChecker$9.createOperatorSubscriber)

module.exports = createRefCountedOperator;