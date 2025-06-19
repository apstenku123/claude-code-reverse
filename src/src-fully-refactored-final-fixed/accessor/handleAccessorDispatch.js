/**
 * Handles dispatching an accessor operation, supporting both callback and Promise-based usage.
 *
 * If the subscription (callback) parameter is not provided, returns a Promise that resolves or rejects
 * based on the outcome of the dispatch. Otherwise, executes the dispatch and invokes the callback
 * with the result or error. Handles errors gracefully and ensures the callback is called asynchronously.
 *
 * @param {Object} sourceObservable - The source observable or action to dispatch.
 * @param {Object} config - Configuration object for the accessor operation.
 * @param {Function} [subscription] - Optional callback function to handle the result or error.
 * @returns {Promise|undefined} Returns a Promise if no callback is provided, otherwise undefined.
 */
function handleAccessorDispatch(sourceObservable, config, subscription) {
  // If no callback is provided, return a Promise for async usage
  if (subscription === undefined) {
    return new Promise((resolve, reject) => {
      // Recursively call with a callback that resolves or rejects the Promise
      handleAccessorDispatch.call(this, sourceObservable, config, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  try {
    // Attempt to dispatch the accessor operation
    this.dispatch(sourceObservable, new _d0(sourceObservable, config, subscription));
  } catch (error) {
    // If the callback is not a function, rethrow the error
    if (typeof subscription !== "function") throw error;
    // Extract the 'opaque' property from the sourceObservable, if present
    const opaqueContext = sourceObservable?.opaque;
    // Ensure the callback is called asynchronously with the error and context
    queueMicrotask(() => subscription(error, { opaque: opaqueContext }));
  }
}

module.exports = handleAccessorDispatch;