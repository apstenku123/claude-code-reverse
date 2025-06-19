/**
 * Wraps a given function so that its execution is deferred asynchronously using DA.asap.
 *
 * @param {Function} targetFunction - The function to be executed asynchronously.
 * @returns {Function} a new function that, when called, schedules the original function to run asynchronously with the provided arguments.
 */
const deferAsyncExecution = (targetFunction) => {
  return (...functionArguments) => {
    // Schedule the execution of targetFunction with the provided arguments asynchronously
    DA.asap(() => targetFunction(...functionArguments));
  };
};

module.exports = deferAsyncExecution;