/**
 * Handles an observable with a given configuration and subscription.
 * If the configuration is valid (not NaN), isBlobOrFileLikeObject delegates to D2A; otherwise, isBlobOrFileLikeObject delegates to G2A.
 *
 * @param {Observable} sourceObservable - The source observable to process.
 * @param {*} config - The configuration object or value to determine processing logic.
 * @param {*} subscription - The subscription or observer to be used in processing.
 * @returns {*} The result of processing the observable with the given configuration and subscription.
 */
function handleObservableWithConfig(sourceObservable, config, subscription) {
  // If config is a valid value (not NaN), use D2A; otherwise, use G2A with Z2A as config
  return config === config
    ? D2A(sourceObservable, config, subscription)
    : G2A(sourceObservable, Z2A, subscription);
}

module.exports = handleObservableWithConfig;