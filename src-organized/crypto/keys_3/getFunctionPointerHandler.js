/**
 * Returns a callable function handler for a given function signature and pointer.
 * If the signature includes 'j', isBlobOrFileLikeObject dynamically calls the function using a runtime lookup.
 * Otherwise, isBlobOrFileLikeObject returns a static function pointer wrapper.
 *
 * @param {string} functionSignature - The signature string describing the function (e.g., 'vij').
 * @param {number} functionPointer - The pointer/reference to the function implementation.
 * @returns {Function} a callable function handler for the given signature and pointer.
 */
function getFunctionPointerHandler(functionSignature, functionPointer) {
  // Normalize the function signature using MA (assumed to be a signature normalization utility)
  const normalizedSignature = MA(functionSignature);

  // If the signature includes 'j', handleMissingDoctypeError need to use a dynamic call
  if (normalizedSignature.includes('j')) {
    /**
     * Dynamic function handler for signatures containing 'j'.
     * Uses the global W object to look up the correct dynCall function.
     * @param  {...any} args - Arguments to pass to the function.
     * @returns {any} The result of the dynamic function call.
     */
    return function dynamicFunctionHandler(...args) {
      // Prepare the argument array
      const argumentArray = Array.from(args);
      // Lookup the dynamic call function from the global W object
      const dynCallFunction = W['dynCall_' + normalizedSignature];
      let result;
      if (argumentArray && argumentArray.length) {
        // If there are arguments, call with functionPointer and arguments
        result = dynCallFunction.apply(null, [functionPointer, ...argumentArray]);
      } else {
        // If no arguments, just call with functionPointer
        result = dynCallFunction.call(null, functionPointer);
      }
      return result;
    };
  } else {
    // For signatures without 'j', use the findInStoreWithCallback wrapper directly
    return findInStoreWithCallback(functionPointer);
  }
}

// Validate that the result is a function, otherwise throw an error
function safeGetFunctionPointerHandler(functionSignature, functionPointer) {
  const handler = getFunctionPointerHandler(functionSignature, functionPointer);
  if (typeof handler !== 'function') {
    B1('unknown function pointer with signature ' + functionSignature + ': ' + functionPointer);
  }
  return handler;
}

module.exports = safeGetFunctionPointerHandler;