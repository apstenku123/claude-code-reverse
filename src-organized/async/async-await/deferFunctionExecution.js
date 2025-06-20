/**
 * Returns a function that, when invoked, schedules the provided callback to be executed asynchronously via DA.asap.
 *
 * @param {Function} callback - The function to be executed asynchronously. Receives any arguments passed to the returned function.
 * @returns {Function} a function that, when called with any arguments, schedules the callback to run asynchronously with those arguments.
 */
const deferFunctionExecution = (callback) => {
  return (...callbackArgs) => {
    // Schedule the callback to be executed asynchronously with the provided arguments
    DA.asap(() => callback(...callbackArgs));
  };
};

module.exports = deferFunctionExecution;