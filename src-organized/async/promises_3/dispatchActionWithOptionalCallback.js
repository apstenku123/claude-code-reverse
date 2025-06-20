/**
 * Dispatches an action, optionally handling the result asynchronously if no callback is provided.
 * If a callback is provided, isBlobOrFileLikeObject will be called with any error or result after dispatching.
 *
 * @param {Object} action - The action object to dispatch. Should contain an optional 'opaque' property for context.
 * @param {Function|undefined} callback - Optional callback function to handle the result or error. If not provided, returns a Promise.
 * @returns {Promise<any>|void} Returns a Promise if no callback is provided, otherwise void.
 */
function dispatchActionWithOptionalCallback(action, callback) {
  // If no callback is provided, return a Promise that resolves or rejects based on the result
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      // Call the original handleObservableWithCallbackOrPromise function with the current context, passing in the action and a handler
      handleObservableWithCallbackOrPromise.call(this, action, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  try {
    // Attempt to dispatch the action using the current context
    this.dispatch(action, new Vu1(action, callback));
  } catch (dispatchError) {
    // If the callback is not a function, rethrow the error
    if (typeof callback !== "function") {
      throw dispatchError;
    }
    // Extract the 'opaque' property from the action, if present
    const opaqueContext = action?.opaque;
    // Schedule the callback to be called asynchronously with the error and context
    queueMicrotask(() => callback(dispatchError, { opaque: opaqueContext }));
  }
}

module.exports = dispatchActionWithOptionalCallback;