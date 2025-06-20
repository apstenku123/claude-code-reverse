/**
 * Creates a curried function that invokes a specified method on a source object (typically an Observable),
 * passing in a configuration and an argument (such as a subscription or observer).
 *
 * @param {Object} sourceObservable - The object containing observable methods to invoke (e.g., an Observable instance).
 * @param {any} config - The configuration or argument to pass as the first parameter to the invoked method.
 * @returns {Function} - a function that takes a method name, returning another function that takes an argument (e.g., a subscription), and invokes the method on the sourceObservable.
 *
 * @example
 * const invoke = createObservableMethodInvoker(myObservable, config);
 * const subscribeWithConfig = invoke('subscribe');
 * subscribeWithConfig(observer);
 */
const createObservableMethodInvoker = (sourceObservable, config) => {
  return (methodName) => {
    return (subscriptionOrObserver) => {
      // Dynamically invoke the specified method on the sourceObservable,
      // passing config and subscriptionOrObserver as arguments
      return sourceObservable[methodName](config, subscriptionOrObserver);
    };
  };
};

module.exports = createObservableMethodInvoker;
