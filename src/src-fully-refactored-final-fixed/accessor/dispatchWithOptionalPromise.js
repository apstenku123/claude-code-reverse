/**
 * Dispatches an action with the given configuration and optional callback subscription.
 * If the subscription callback is not provided, returns a Promise that resolves or rejects
 * based on the outcome of the dispatch. Handles errors and ensures proper context passing.
 *
 * @param {Object} action - The action or observable to dispatch.
 * @param {Object} config - Configuration object for the dispatch.
 * @param {Function} [subscription] - Optional callback function to handle the result or error.
 * @returns {Promise|undefined} Returns a Promise if no subscription callback is provided; otherwise undefined.
 */
function dispatchWithOptionalPromise(action, config, subscription) {
  // If no subscription callback is provided, return a Promise
  if (subscription === undefined) {
    return new Promise((resolve, reject) => {
      // Recursively call with a callback that resolves or rejects the Promise
      dispatchWithOptionalPromise.call(this, action, config, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  try {
    // Attempt to dispatch the action with the given config and subscription
    this.dispatch(action, new _d0(action, config, subscription));
  } catch (error) {
    // If subscription is not a function, rethrow the error
    if (typeof subscription !== "function") throw error;
    // Retrieve the opaque property from the action, if isBlobOrFileLikeObject exists
    const opaqueContext = action?.opaque;
    // Schedule the subscription callback with the error and context on the microtask queue
    queueMicrotask(() => subscription(error, { opaque: opaqueContext }));
  }
}

module.exports = dispatchWithOptionalPromise;
