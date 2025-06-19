/**
 * Creates a connectable observable that manages a subscription to a source observable.
 * Allows for resetting the connector on disconnect and provides a connect method to start the subscription.
 *
 * @param {Observable} sourceObservable - The source observable to be connected.
 * @param {Object} [config=mR9] - Configuration object for the connector.
 * @param {Function} config.connector - Function that returns a new subject or connector for multicasting.
 * @param {boolean} [config.resetOnDisconnect=true] - Whether to reset the connector when disconnected.
 * @returns {Observable} An observable with an added .connect() method to start the subscription.
 */
function createConnectableObservable(sourceObservable, config = mR9) {
  let subscription = null;
  const getConnector = config.connector;
  const resetOnDisconnect = config.resetOnDisconnect === undefined ? true : config.resetOnDisconnect;

  // Create a new connector (e.g., Subject) instance
  let connectorInstance = getConnector();

  // Wrap the connector in an observable that subscribes to the connector
  const connectableObservable = new gR9.Observable(function (observer) {
    return connectorInstance.subscribe(observer);
  });

  /**
   * Connects the source observable to the connector if not already connected.
   * If resetOnDisconnect is true, resets the connector when the subscription is closed.
   * @returns {Subscription} The subscription to the source observable.
   */
  connectableObservable.connect = function () {
    // Only connect if not already connected or if the previous subscription is closed
    if (!subscription || subscription.closed) {
      // Subscribe the source observable to the connector
      subscription = hR9.defer(function () {
        return sourceObservable;
      }).subscribe(connectorInstance);

      // If resetOnDisconnect is enabled, reset the connector when unsubscribed
      if (resetOnDisconnect) {
        subscription.add(function () {
          connectorInstance = getConnector();
        });
      }
    }
    return subscription;
  };

  return connectableObservable;
}

module.exports = createConnectableObservable;