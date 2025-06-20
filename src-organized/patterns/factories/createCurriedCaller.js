/**
 * Creates a curried function that calls the provided method with preset arguments and any additional arguments supplied at call time.
 *
 * @param {Function} methodToCall - The function to be invoked via .call().
 * @param {any} presetArg1 - The first preset argument to pass to the method.
 * @param {any} presetArg2 - The second preset argument to pass to the method.
 * @param {any} presetArg3 - The third preset argument to pass to the method.
 * @returns {Function} a function that, when called, invokes methodToCall with preset arguments and any additional arguments.
 */
function createCurriedCaller(methodToCall, presetArg1, presetArg2, presetArg3) {
  return function (...additionalArgs) {
    // Call the method with 'this' context, preset arguments, and any additional arguments
    return methodToCall.call(this, presetArg1, presetArg2, presetArg3, ...additionalArgs);
  };
}

module.exports = createCurriedCaller;