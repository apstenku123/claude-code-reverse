/**
 * Handles a request by dispatching isBlobOrFileLikeObject with the given options and callback, supporting both callback and Promise-based usage.
 *
 * If the callback is not provided, returns a Promise that resolves or rejects based on the request outcome.
 * If the callback is provided, isBlobOrFileLikeObject will be called with the error or result.
 *
 * @param {Object} createRequestOptions - The options for the request, including method, protocol, and optional opaque identifier.
 * @param {Function} [callback] - Optional callback function to handle the result or error. If not provided, a Promise is returned.
 * @returns {Promise|undefined} Returns a Promise if no callback is provided, otherwise undefined.
 */
function handleRequestWithCallbackOrPromise(createRequestOptions, callback) {
  // If callback is not provided, return a Promise interface
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      // Recursively call with a callback to bridge Promise and callback APIs
      handleRequestWithCallbackOrPromise.call(this, createRequestOptions, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  try {
    // Create a new request/connection instance
    const requestInstance = new cd0(createRequestOptions, callback);
    // Dispatch the request with default method and protocol if not provided
    this.dispatch({
      ...createRequestOptions,
      method: createRequestOptions.method || "GET",
      upgrade: createRequestOptions.protocol || "Websocket"
    }, requestInstance);
  } catch (error) {
    // If callback is not a function, rethrow the error
    if (typeof callback !== "function") throw error;
    // Retrieve the opaque identifier if present
    const opaqueId = createRequestOptions?.opaque;
    // Ensure callback is called asynchronously with error and opaque info
    queueMicrotask(() => callback(error, { opaque: opaqueId }));
  }
}

module.exports = handleRequestWithCallbackOrPromise;