/**
 * Creates a new function that, when invoked, calls the provided target function with a specified 'this' context and forwards all arguments.
 *
 * @param {Function} targetFunction - The function to be invoked.
 * @param {Object} thisContext - The value to be used as 'this' when calling the target function.
 * @returns {Function} a new function that calls the target function with the given context and arguments.
 */
const createBoundFunction = (targetFunction, thisContext) => {
  // Return a new function that applies the target function with the specified context and arguments
  return function boundFunction(...args) {
    return targetFunction.apply(thisContext, args);
  };
};

module.exports = createBoundFunction;
