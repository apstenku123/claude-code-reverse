/**
 * Handles the dispatching of an observable action, supporting both callback and Promise-based usage.
 * If no subscription callback is provided, returns a Promise that resolves or rejects based on the outcome.
 * Otherwise, dispatches the action and invokes the callback with the result or error.
 *
 * @param {Object} sourceObservable - The observable or action source to dispatch.
 * @param {Object} config - Configuration object for the dispatch/action.
 * @param {Function} [subscription] - Optional callback to handle the result or error. If omitted, returns a Promise.
 * @returns {Promise|undefined} Returns a Promise if no subscription callback is provided; otherwise undefined.
 */
function handleObservableDispatch(sourceObservable, config, subscription) {
  // If no subscription callback is provided, return a Promise interface
  if (subscription === undefined) {
    return new Promise((resolve, reject) => {
      // Call the same function with a callback that resolves/rejects the Promise
      handleObservableDispatch.call(this, sourceObservable, config, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  try {
    // Attempt to dispatch the action using the provided observable and config
    this.dispatch(sourceObservable, new _d0(sourceObservable, config, subscription));
  } catch (dispatchError) {
    // If the subscription is not a function, rethrow the error
    if (typeof subscription !== "function") throw dispatchError;
    // Extract the 'opaque' property from the observable, if present
    const opaqueValue = sourceObservable?.opaque;
    // Schedule the callback to be called asynchronously with the error and opaque info
    queueMicrotask(() => subscription(dispatchError, { opaque: opaqueValue }));
  }
}

module.exports = handleObservableDispatch;