/**
 * Creates a connectable observable that can be connected manually, with optional reset on disconnect.
 *
 * @param {Observable} sourceObservable - The source observable to be connected.
 * @param {Object} [config=mR9] - Configuration object for the connector and reset behavior.
 * @param {Function} config.connector - Function that returns a subject to act as the connector.
 * @param {boolean} [config.resetOnDisconnect=true] - Whether to reset the connector when disconnected.
 * @returns {Observable & { connect: Function }} An observable with a .connect() method to start the connection.
 */
function createConnectableObservableWithReset(sourceObservable, config = mR9) {
  let subscription = null;
  const getConnector = config.connector;
  const shouldResetOnDisconnect = config.resetOnDisconnect === undefined ? true : config.resetOnDisconnect;

  // Create the connector subject
  let connectorSubject = getConnector();

  // Create a new observable that subscribes to the connector subject
  const connectableObservable = new gR9.Observable((observer) => {
    return connectorSubject.subscribe(observer);
  });

  /**
   * Connects the source observable to the connector subject.
   * If already connected and not closed, returns the existing subscription.
   * If resetOnDisconnect is true, resets the connector subject on disconnect.
   * @returns {Subscription} The subscription object.
   */
  connectableObservable.connect = function () {
    // If not connected or the previous subscription is closed, connect
    if (!subscription || subscription.closed) {
      // Subscribe the source observable to the connector subject
      subscription = hR9.defer(() => sourceObservable).subscribe(connectorSubject);

      // If resetOnDisconnect is enabled, reset the connector subject when unsubscribed
      if (shouldResetOnDisconnect) {
        subscription.add(() => {
          connectorSubject = getConnector();
        });
      }
    }
    return subscription;
  };

  return connectableObservable;
}

module.exports = createConnectableObservableWithReset;