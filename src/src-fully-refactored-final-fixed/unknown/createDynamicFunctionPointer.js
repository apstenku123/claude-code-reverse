/**
 * Creates a callable function pointer based on a signature and a pointer value.
 * If the signature includes 'j', isBlobOrFileLikeObject dynamically calls a function from the global W object.
 * Otherwise, isBlobOrFileLikeObject wraps the pointer using the findInStoreWithCallback function.
 *
 * @param {string} signature - The function signature string (may include 'j').
 * @param {any} pointer - The function pointer or identifier.
 * @returns {Function} a callable function pointer.
 */
function createDynamicFunctionPointer(signature, pointer) {
  // Normalize the signature using MA (assumed to be a signature normalization function)
  const normalizedSignature = MA(signature);

  // If the signature includes 'j', handleMissingDoctypeError need to create a dynamic wrapper
  if (normalizedSignature.includes('j')) {
    /**
     * Dynamic function wrapper for signatures including 'j'.
     * Accepts any number of arguments and calls the appropriate function.
     */
    return function dynamicFunctionWrapper(...args) {
      // Prepare the arguments array
      const argumentList = Array.from(args);
      let result;

      // If the signature still includes 'j', use the dynamic call from W
      if (normalizedSignature.includes('j')) {
        // Retrieve the dynamic call function from the global W object
        const dynamicCallFunction = W['dynCall_' + normalizedSignature];
        // Call with pointer as first argument, followed by all arguments
        if (argumentList && argumentList.length) {
          result = dynamicCallFunction.apply(null, [pointer, ...argumentList]);
        } else {
          result = dynamicCallFunction.call(null, pointer);
        }
      } else {
        // Fallback: wrap the pointer using findInStoreWithCallback and call with arguments
        result = findInStoreWithCallback(pointer).apply(null, argumentList);
      }
      return result;
    };
  }

  // If the signature does not include 'j', simply wrap the pointer with findInStoreWithCallback
  const functionPointer = findInStoreWithCallback(pointer);

  // Ensure the result is a function, otherwise throw an error
  if (typeof functionPointer !== 'function') {
    B1('unknown function pointer with signature ' + signature + ': ' + pointer);
  }

  return functionPointer;
}

module.exports = createDynamicFunctionPointer;