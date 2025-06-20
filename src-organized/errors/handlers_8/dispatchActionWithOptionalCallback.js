/**
 * Dispatches an action with the given configuration and optional callback or returns a Promise if no callback is provided.
 *
 * If a callback is provided, isBlobOrFileLikeObject will be called with the result or error. If not, the function returns a Promise that resolves or rejects accordingly.
 *
 * @param {Object} action - The action object to dispatch. Should contain an 'opaque' property if needed for context.
 * @param {Object} config - Configuration object for the action dispatch.
 * @param {Function} [callback] - Optional callback function to handle the result or error. Signature: (error, result) => void
 * @returns {Promise|undefined} Returns a Promise if no callback is provided; otherwise, undefined.
 */
function dispatchActionWithOptionalCallback(action, config, callback) {
  // If callback is not provided, return a Promise and call this function recursively with a callback
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      dispatchActionWithOptionalCallback.call(this, action, config, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  try {
    // Attempt to dispatch the action using the provided dispatcher and configuration
    this.dispatch(action, new _d0(action, config, callback));
  } catch (error) {
    // If callback is not a function, rethrow the error
    if (typeof callback !== "function") throw error;
    // Extract 'opaque' property from action if available for context
    const opaqueContext = action?.opaque;
    // Schedule the callback to be called asynchronously with the error and context
    queueMicrotask(() => callback(error, { opaque: opaqueContext }));
  }
}

module.exports = dispatchActionWithOptionalCallback;