/**
 * Returns a function that, when called, schedules the provided function to execute asynchronously as soon as possible.
 * This is useful for deferring execution to the next event loop tick, ensuring that the function runs after the current call stack is cleared.
 *
 * @param {Function} targetFunction - The function to be executed asynchronously. Can accept any number of arguments.
 * @returns {Function} a new function that, when invoked with arguments, schedules the targetFunction to run asynchronously with those arguments.
 */
const deferExecution = (targetFunction) => {
  return (...functionArguments) => {
    // Schedule the targetFunction to run asynchronously with the provided arguments
    DA.asap(() => targetFunction(...functionArguments));
  };
};

module.exports = deferExecution;
