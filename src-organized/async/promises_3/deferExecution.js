/**
 * Defers the execution of the provided function until the next microtask,
 * returning a Promise that resolves with the function'createInteractionAccessor result.
 *
 * @param {Function} functionToDefer - The function to be executed asynchronously.
 * @returns {Promise<any>} a Promise that resolves with the result of functionToDefer.
 */
const deferExecution = (functionToDefer) => {
  // Use Promise.resolve().then(...) to schedule the function for the next microtask
  return Promise.resolve().then(functionToDefer);
};

module.exports = deferExecution;
