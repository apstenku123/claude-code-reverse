/**
 * Handles a request with optional upgrade (e.g., WebSocket), supporting both Promise and callback styles.
 *
 * If no callback is provided, returns a Promise that resolves or rejects based on the request outcome.
 * If a callback is provided, invokes isBlobOrFileLikeObject with the error or result.
 *
 * @param {Object} createRequestOptions - The request options, including method, protocol, and optional opaque metadata.
 * @param {Function} [callback] - Optional callback function to handle the result or error.
 * @returns {Promise|undefined} Returns a Promise if no callback is provided, otherwise undefined.
 */
function handleRequestWithUpgrade(createRequestOptions, callback) {
  // If callback is not provided, return a Promise interface
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      // Call the same function with a callback that resolves/rejects the Promise
      handleRequestWithUpgrade.call(this, createRequestOptions, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  try {
    // Create a new request/connection object (e.g., for WebSocket upgrade)
    const connection = new cd0(createRequestOptions, callback);

    // Dispatch the request with default method and upgrade protocol if not provided
    this.dispatch({
      ...createRequestOptions,
      method: createRequestOptions.method || "GET",
      upgrade: createRequestOptions.protocol || "Websocket"
    }, connection);
  } catch (error) {
    // If callback is not a function, rethrow the error
    if (typeof callback !== "function") throw error;

    // Extract opaque metadata if available
    const opaqueMetadata = createRequestOptions?.opaque;

    // Schedule the callback to be called asynchronously with the error and opaque metadata
    queueMicrotask(() => callback(error, { opaque: opaqueMetadata }));
  }
}

module.exports = handleRequestWithUpgrade;
