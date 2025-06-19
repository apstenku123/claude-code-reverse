/**
 * Creates a callable JavaScript function from a WebAssembly function pointer and signature.
 * Handles dynamic calls for signatures containing 'j' (indicating JS function pointer arguments),
 * otherwise returns a direct wrapper for the function pointer.
 *
 * @param {string} wasmSignature - The signature string for the WebAssembly function (e.g., 'vij').
 * @param {number} wasmFunctionPointer - The numeric pointer to the WebAssembly function.
 * @returns {Function} a JavaScript function that wraps the WebAssembly function pointer.
 */
function createWasmFunctionPointer(wasmSignature, wasmFunctionPointer) {
  // Normalize and process the signature
  const normalizedSignature = MA(wasmSignature);

  // If the signature includes 'j', handleMissingDoctypeError need to handle JS function pointer arguments
  let callableFunction;
  if (normalizedSignature.includes('j')) {
    const dynamicSignature = normalizedSignature;
    const argumentList = [];

    callableFunction = function (...args) {
      // Reset argument list and assign new arguments
      argumentList.length = 0;
      Object.assign(argumentList, args);

      let result;
      if (dynamicSignature.includes('j')) {
        // Use the dynamic call mechanism for signatures with 'j'
        const dynCallFunction = W["dynCall_" + dynamicSignature];
        if (argumentList && argumentList.length) {
          // Call with the function pointer and all arguments
          result = dynCallFunction.apply(null, [wasmFunctionPointer, ...argumentList]);
        } else {
          // Call with only the function pointer
          result = dynCallFunction.call(null, wasmFunctionPointer);
        }
      } else {
        // Fallback: direct wrapper
        result = findInStoreWithCallback(wasmFunctionPointer).apply(null, argumentList);
      }
      return result;
    };
  } else {
    // If no 'j' in signature, just return the direct wrapper
    callableFunction = findInStoreWithCallback(wasmFunctionPointer);
  }

  // Error handling: ensure the result is a function
  if (typeof callableFunction !== "function") {
    B1(`unknown function pointer with signature ${wasmSignature}: ${wasmFunctionPointer}`);
  }

  return callableFunction;
}

module.exports = createWasmFunctionPointer;