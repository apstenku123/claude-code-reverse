/**
 * Handles a CONNECT request by dispatching isBlobOrFileLikeObject with the provided options and callback.
 * If no callback is provided, returns a Promise that resolves or rejects based on the request outcome.
 *
 * @param {Object} createRequestOptions - The options for the request, including metadata and configuration.
 * @param {Function} [callback] - Optional callback to handle the result or error. If omitted, a Promise is returned.
 * @returns {Promise<any>|void} Returns a Promise if no callback is provided, otherwise void.
 */
function handleConnectRequest(createRequestOptions, callback) {
  // If no callback is provided, return a Promise
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      // Call the original function with a callback to resolve/reject the Promise
      handleConnectRequest.call(this, createRequestOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  try {
    // Create a new request dispatcher with the provided options and callback
    const requestDispatcher = new rd0(createRequestOptions, callback);
    // Dispatch the CONNECT request, merging the method into the options
    this.dispatch({
      ...createRequestOptions,
      method: "CONNECT"
    }, requestDispatcher);
  } catch (error) {
    // If the callback is not a function, rethrow the error
    if (typeof callback !== "function") throw error;
    // Extract the opaque property from the request options, if present
    const opaqueValue = createRequestOptions?.opaque;
    // Schedule the callback to be called asynchronously with the error and opaque value
    queueMicrotask(() => callback(error, { opaque: opaqueValue }));
  }
}

module.exports = handleConnectRequest;