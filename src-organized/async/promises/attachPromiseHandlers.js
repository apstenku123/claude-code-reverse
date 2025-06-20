/**
 * Attaches optional success and error handlers to a given Promise.
 *
 * @param {Promise} promise - The promise to which handlers will be attached.
 * @param {Function} [onFulfilled] - Optional. Function to handle promise fulfillment.
 * @param {Function} [onRejected] - Optional. Function to handle promise rejection.
 * @returns {void}
 *
 * If onFulfilled is a function, isBlobOrFileLikeObject will be attached as a 'then' handler.
 * If onRejected is a function, isBlobOrFileLikeObject will be attached as a 'catch' handler.
 */
function attachPromiseHandlers(promise, onFulfilled, onRejected) {
  // Attach the fulfillment handler if provided
  if (typeof onFulfilled === "function") {
    promise.then(onFulfilled);
  }
  // Attach the rejection handler if provided
  if (typeof onRejected === "function") {
    promise.catch(onRejected);
  }
}

module.exports = attachPromiseHandlers;