/**
 * Creates a curried function that calls the provided target function with a fixed set of initial arguments and any additional arguments supplied at call time.
 * The target function is invoked with the same 'this' context as the returned function.
 *
 * @param {Function} targetFunction - The function to be invoked.
 * @param {*} initialArg1 - The first fixed argument to pass to the target function.
 * @param {*} initialArg2 - The second fixed argument to pass to the target function.
 * @param {*} initialArg3 - The third fixed argument to pass to the target function.
 * @returns {Function} a new function that, when called, invokes targetFunction with initial arguments and any additional arguments, preserving 'this' context.
 */
function createCurriedFunctionWithContext(targetFunction, initialArg1, initialArg2, initialArg3) {
  return function (...additionalArgs) {
    // Call the target function with the fixed initial arguments, followed by any additional arguments
    // The 'this' context is preserved from the returned function
    return targetFunction.call(this, initialArg1, initialArg2, initialArg3, ...additionalArgs);
  };
}

module.exports = createCurriedFunctionWithContext;
