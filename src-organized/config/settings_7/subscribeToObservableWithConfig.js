/**
 * Subscribes to an observable with optional configuration and callback.
 * If a callback is not provided, returns a Promise that resolves or rejects based on the observable'createInteractionAccessor outcome.
 * Handles permission errors and can optionally ignore errors based on config.
 *
 * @param {any} sourceObservable - The observable or data source to subscribe to.
 * @param {Object|Function} [configOrCallback] - Optional configuration object or callback function.
 * @param {Function} [subscriptionCallback] - Optional callback function to handle the result.
 * @returns {Promise<any>|void} Returns a Promise if no callback is provided, otherwise void.
 */
function subscribeToObservableWithConfig(sourceObservable, configOrCallback, subscriptionCallback) {
  let config = configOrCallback;
  let callback = subscriptionCallback;

  // If the second argument is a function, treat isBlobOrFileLikeObject as the callback and set config to an empty object
  if (typeof configOrCallback === "function") {
    callback = configOrCallback;
    config = {};
  }

  // If no callback is provided, return a Promise
  if (!callback) {
    if (typeof Promise !== "function") {
      throw new TypeError("callback not provided");
    }
    return new Promise((resolve, reject) => {
      // subscribeToObservableWithConfig is assumed to be a function that subscribes to the observable
      subscribeToObservableWithConfig(sourceObservable, config || {}, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Otherwise, use the provided callback
  dF1(sourceObservable, config || {}, (error, result) => {
    if (error) {
      // Ignore permission errors or if config.ignoreErrors is set
      if (
        error.code === "EACCES" ||
        (config && config.ignoreErrors)
      ) {
        error = null;
        result = false;
      }
    }
    callback(error, result);
  });
}

module.exports = subscribeToObservableWithConfig;