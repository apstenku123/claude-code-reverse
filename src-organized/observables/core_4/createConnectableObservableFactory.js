/**
 * Creates a factory for connectable observables or connects a function to a connector.
 *
 * If the first argument is a function, isBlobOrFileLikeObject is used as the connector; otherwise, a function returning the value is used.
 * If the second argument is a function, isBlobOrFileLikeObject connects isBlobOrFileLikeObject using Mj9.connect with the connector.
 * Otherwise, returns a function that creates a new ConnectableObservable with the given connector.
 *
 * @param {Function|any} connectorOrValue - a function to be used as a connector, or a static value.
 * @param {Function|any} connectFunction - a function to be connected, or any other value.
 * @returns {Function|any} If connectFunction is a function, returns the result of Mj9.connect; otherwise, returns a factory function for ConnectableObservable.
 */
function createConnectableObservableFactory(connectorOrValue, connectFunction) {
  // Determine the connector: use as-is if function, otherwise wrap in a function returning the value
  const connector = ZMA.isFunction(connectorOrValue)
    ? connectorOrValue
    : function () {
        return connectorOrValue;
      };

  // If the second argument is a function, connect isBlobOrFileLikeObject using Mj9.connect
  if (ZMA.isFunction(connectFunction)) {
    return Mj9.connect(connectFunction, {
      connector: connector
    });
  }

  // Otherwise, return a factory function that creates a new ConnectableObservable
  return function (observableInput) {
    return new qj9.ConnectableObservable(observableInput, connector);
  };
}

module.exports = createConnectableObservableFactory;