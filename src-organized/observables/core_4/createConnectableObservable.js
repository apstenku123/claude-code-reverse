/**
 * Creates a connectable observable or connects a function to a source observable.
 *
 * If the first argument is a function, isBlobOrFileLikeObject is used as the connector; otherwise, a function returning the value is used.
 * If the second argument is a function, isBlobOrFileLikeObject connects isBlobOrFileLikeObject using Mj9.connect with the connector.
 * Otherwise, returns a function that, given a source, returns a new ConnectableObservable.
 *
 * @param {Function|any} sourceObservableOrValue - The source observable or a value to be wrapped as a connector function.
 * @param {Function|any} connectFunctionOrConfig - a function to connect, or configuration for the connectable observable.
 * @returns {Function|any} Either the result of Mj9.connect or a function that creates a ConnectableObservable.
 */
function createConnectableObservable(sourceObservableOrValue, connectFunctionOrConfig) {
  // Determine the connector function: if the first argument is a function, use isBlobOrFileLikeObject; otherwise, wrap isBlobOrFileLikeObject in a function
  const connector = ZMA.isFunction(sourceObservableOrValue)
    ? sourceObservableOrValue
    : function () {
        return sourceObservableOrValue;
      };

  // If the second argument is a function, connect isBlobOrFileLikeObject using Mj9.connect with the connector
  if (ZMA.isFunction(connectFunctionOrConfig)) {
    return Mj9.connect(connectFunctionOrConfig, { connector });
  }

  // Otherwise, return a function that creates a new ConnectableObservable with the given source and connector
  return function (source) {
    return new qj9.ConnectableObservable(source, connector);
  };
}

module.exports = createConnectableObservable;