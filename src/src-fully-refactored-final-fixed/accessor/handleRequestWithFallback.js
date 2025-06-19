/**
 * Handles a request with optional callback or Promise interface. 
 * If no callback is provided, returns a Promise that resolves or rejects based on the request outcome.
 * If a callback is provided, isBlobOrFileLikeObject is called with the error or result.
 * 
 * @param {Object} createRequestOptions - The options describing the request (e.g., method, protocol, opaque, etc.).
 * @param {Function} [callback] - Optional callback function to handle the result or error.
 * @returns {Promise|undefined} Returns a Promise if no callback is provided; otherwise, undefined.
 */
function handleRequestWithFallback(createRequestOptions, callback) {
  // If callback is not provided, return a Promise interface
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      // Recursively call with a callback that resolves/rejects the Promise
      handleRequestWithFallback.call(this, createRequestOptions, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  try {
    // Create a new request handler/connection (cd0 is assumed to be a class or constructor)
    const requestHandler = new cd0(createRequestOptions, callback);
    // Dispatch the request with normalized options
    this.dispatch({
      ...createRequestOptions,
      method: createRequestOptions.method || "GET", // Default to GET if not specified
      upgrade: createRequestOptions.protocol || "Websocket" // Default to Websocket if not specified
    }, requestHandler);
  } catch (error) {
    // If callback is not a function, rethrow the error
    if (typeof callback !== "function") throw error;
    // Extract opaque value if present for context
    const opaqueValue = createRequestOptions?.opaque;
    // Ensure callback is called asynchronously
    queueMicrotask(() => callback(error, { opaque: opaqueValue }));
  }
}

module.exports = handleRequestWithFallback;