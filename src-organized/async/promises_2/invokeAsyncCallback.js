/**
 * Invokes the provided callback asynchronously using a resolved Promise.
 * This ensures the callback executes after the current call stack, similar to setImmediate or process.nextTick.
 *
 * @param {Function} callback - The function to be invoked asynchronously.
 * @returns {Promise<any>} a promise that resolves with the value returned by the callback.
 */
const invokeAsyncCallback = (callback) => {
  // Use Promise.resolve().then(callback) to schedule the callback asynchronously
  return Promise.resolve().then(callback);
};

module.exports = invokeAsyncCallback;
