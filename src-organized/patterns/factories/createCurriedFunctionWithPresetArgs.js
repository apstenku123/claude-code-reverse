/**
 * Creates a curried function that calls the provided target function with preset arguments,
 * followed by any additional arguments supplied at call time. The target function is invoked
 * with a specific 'this' context.
 *
 * @param {Function} targetFunction - The function to be invoked.
 * @param {any} presetArg1 - The first preset argument to pass to the target function.
 * @param {any} presetArg2 - The second preset argument to pass to the target function.
 * @param {any} presetArg3 - The third preset argument to pass to the target function.
 * @returns {Function} a new function that, when called, invokes the target function with the preset arguments and any additional arguments.
 */
function createCurriedFunctionWithPresetArgs(targetFunction, presetArg1, presetArg2, presetArg3) {
  return function (...additionalArgs) {
    // Call the target function with the preset arguments, followed by any additional arguments
    // The 'this' context is preserved
    return targetFunction.call(this, presetArg1, presetArg2, presetArg3, ...additionalArgs);
  };
}

module.exports = createCurriedFunctionWithPresetArgs;