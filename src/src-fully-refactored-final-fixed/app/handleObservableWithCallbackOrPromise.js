/**
 * Handles an observable action, dispatching isBlobOrFileLikeObject with an optional callback or returning a Promise.
 * If no callback is provided, returns a Promise that resolves or rejects based on the action result.
 * If a callback is provided, dispatches the action and invokes the callback with the error and context if an exception occurs.
 *
 * @param {Object} observableAction - The action or observable to process.
 * @param {Function|undefined} callback - Optional callback to handle the result or error.
 * @returns {Promise|undefined} Returns a Promise if no callback is provided; otherwise, undefined.
 */
function handleObservableWithCallbackOrPromise(observableAction, callback) {
  // If no callback is provided, return a Promise that resolves/rejects based on the action result
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      // Call the original handleObservableWithCallbackOrPromise function with the observableAction and a node-style callback
      handleObservableWithCallbackOrPromise.call(this, observableAction, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  try {
    // Attempt to dispatch the action with the provided callback
    this.dispatch(observableAction, new Vu1(observableAction, callback));
  } catch (dispatchError) {
    // If the callback is not a function, rethrow the error
    if (typeof callback !== "function") throw dispatchError;
    // Extract the 'opaque' property from the observableAction, if present
    const opaqueContext = observableAction?.opaque;
    // Schedule the callback to be called asynchronously with the error and context
    queueMicrotask(() => callback(dispatchError, { opaque: opaqueContext }));
  }
}

module.exports = handleObservableWithCallbackOrPromise;