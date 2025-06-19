/**
 * Handles a connection request, supporting both Promise and callback-based invocation.
 * If no callback is provided, returns a Promise that resolves or rejects based on the outcome.
 * If a callback is provided, invokes isBlobOrFileLikeObject with the result or error asynchronously.
 *
 * @param {Object} createRequestOptions - The options for the connection request. May include metadata such as 'opaque'.
 * @param {Function} [callback] - Optional. Callback to handle the result or error. If omitted, a Promise is returned.
 * @returns {Promise<any>|void} Returns a Promise if no callback is provided; otherwise, returns void.
 */
function handleConnectionRequest(createRequestOptions, callback) {
  // If no callback is provided, return a Promise-based interface
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      // Call the legacy handleConnectRequest function with a callback that resolves or rejects the Promise
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
    // Create a new connection context (rd0 is assumed to be a connection/session handler)
    const connectionContext = new rd0(createRequestOptions, callback);
    // Dispatch the connection request with method 'CONNECT'
    this.dispatch({
      ...createRequestOptions,
      method: "CONNECT"
    }, connectionContext);
  } catch (error) {
    // If the callback is not a function, rethrow the error
    if (typeof callback !== "function") {
      throw error;
    }
    // Extract the 'opaque' property from createRequestOptions if present
    const opaqueValue = createRequestOptions?.opaque;
    // Ensure the callback is invoked asynchronously with the error and context
    queueMicrotask(() => callback(error, { opaque: opaqueValue }));
  }
}

module.exports = handleConnectionRequest;
