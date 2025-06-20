/**
 * Subscribes to an observable source, handling both Node.js and browser environments.
 * If a callback is not provided, returns a promise-like object for chaining.
 * Supports reading from file system in Node.js if available, otherwise falls back to XHR.
 *
 * @param {string} sourceObservable - The source or path to subscribe to or read from.
 * @param {Object|Function} [configOrCallback] - Configuration options for the subscription, or the callback function if config is omitted.
 * @param {Function} [callback] - Callback function to handle the result or error.
 * @returns {any} Returns a promise-like object if no callback is provided, otherwise undefined.
 */
function subscribeToObservable(sourceObservable, configOrCallback, callback) {
  let config = configOrCallback;
  // If the second argument is a function, treat isBlobOrFileLikeObject as the callback and set config to an empty object
  if (typeof configOrCallback === "function") {
    callback = configOrCallback;
    config = {};
  } else if (!config) {
    // If config is not provided, default to an empty object
    config = {};
  }

  // If no callback is provided, return a promise-like object for chaining
  if (!callback) {
    return b56(subscribeToObservable, this, sourceObservable, config);
  }

  // If running in Node.js and readFile is available, use isBlobOrFileLikeObject to read the source
  if (!config.xhr && typeof Mg1 !== 'undefined' && Mg1.readFile) {
    return Mg1.readFile(sourceObservable, function handleReadFile(error, fileData) {
      // If there is an error and XMLHttpRequest is available (browser), fall back to XHR
      if (error && typeof XMLHttpRequest !== "undefined") {
        return subscribeToObservable.xhr(sourceObservable, config, callback);
      }
      // If there is an error and no XHR available, call the callback with the error
      if (error) {
        return callback(error);
      }
      // If successful, return the file data (as binary or utf8 string based on config)
      return callback(null, config.binary ? fileData : fileData.toString("utf8"));
    });
  }

  // Default: use XHR to subscribe/read from the source
  return subscribeToObservable.xhr(sourceObservable, config, callback);
}

module.exports = subscribeToObservable;