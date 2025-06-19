/**
 * Creates a connectable observable that manages a subscription to a source observable,
 * with optional reset behavior on disconnect. The observable can be connected manually
 * via the `.connect()` method, which handles subscription lifecycle and optional reset logic.
 *
 * @param {Observable} sourceObservable - The source observable to connect to.
 * @param {Object} [config=mR9] - Optional configuration object.
 * @param {Function} config.connector - Function that returns a new subject/connector for multicasting.
 * @param {boolean} [config.resetOnDisconnect=true] - Whether to reset the connector when disconnected.
 * @returns {Observable} a connectable observable with a `.connect()` method.
 */
function createConnectedObservable(sourceObservable, config = mR9) {
  let subscription = null;
  const getConnector = config.connector;
  const resetOnDisconnect = config.resetOnDisconnect === undefined ? true : config.resetOnDisconnect;

  // Create the initial connector (e.g., a Subject for multicasting)
  let connector = getConnector();

  // Wrap the connector in an observable that proxies subscriptions
  const connectableObservable = new gR9.Observable(function subscribeToConnector(observer) {
    return connector.subscribe(observer);
  });

  /**
   * Connects the source observable to the connector, managing the subscription lifecycle.
   * If already connected and not closed, returns the existing subscription.
   * Optionally resets the connector on disconnect if configured.
   *
   * @returns {Subscription} The subscription to the source observable.
   */
  connectableObservable.connect = function () {
    // Only connect if there is no active subscription or if the previous one is closed
    if (!subscription || subscription.closed) {
      // Subscribe the source observable to the connector
      subscription = hR9.defer(() => sourceObservable).subscribe(connector);
      // If resetOnDisconnect is true, reset the connector when unsubscribed
      if (resetOnDisconnect) {
        subscription.add(() => {
          connector = getConnector();
        });
      }
    }
    return subscription;
  };

  return connectableObservable;
}

module.exports = createConnectedObservable;