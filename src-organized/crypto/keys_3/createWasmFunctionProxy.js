/**
 * Creates a callable JavaScript proxy for a WebAssembly function pointer, handling dynamic signatures.
 *
 * If the signature includes 'j', isBlobOrFileLikeObject uses a dynamic call mechanism; otherwise, isBlobOrFileLikeObject wraps the function pointer directly.
 * Throws an error if the resulting proxy is not a function.
 *
 * @param {string} wasmSignature - The signature string for the WebAssembly function (e.g., 'vij').
 * @param {number} wasmFunctionPointer - The numeric pointer to the WebAssembly function.
 * @returns {Function} a JavaScript function proxy for the WebAssembly function pointer.
 */
function createWasmFunctionProxy(wasmSignature, wasmFunctionPointer) {
  // Normalize the signature using MA (assumed to be a signature normalization utility)
  const normalizedSignature = MA(wasmSignature);

  let functionProxy;

  // If the signature includes 'j', use dynamic call mechanism
  if (normalizedSignature.includes('j')) {
    const dynamicSignature = normalizedSignature;
    const argumentList = [];

    functionProxy = function (...args) {
      // Reset argument list and assign new arguments
      argumentList.length = 0;
      Object.assign(argumentList, args);

      let result;
      if (dynamicSignature.includes('j')) {
        // Use the dynamic call from the WebAssembly module'createInteractionAccessor exports
        const dynCallFunction = W['dynCall_' + dynamicSignature];
        if (argumentList && argumentList.length) {
          // Call with the function pointer and arguments
          result = dynCallFunction.apply(null, [wasmFunctionPointer].concat(argumentList));
        } else {
          // Call with only the function pointer
          result = dynCallFunction.call(null, wasmFunctionPointer);
        }
      } else {
        // Fallback to findInStoreWithCallback utility if signature no longer includes 'j'
        result = findInStoreWithCallback(wasmFunctionPointer).apply(null, argumentList);
      }
      return result;
    };
  } else {
    // If no 'j' in signature, wrap the function pointer directly
    functionProxy = findInStoreWithCallback(wasmFunctionPointer);
  }

  // Validate that the proxy is a function
  if (typeof functionProxy !== 'function') {
    B1('unknown function pointer with signature ' + wasmSignature + ': ' + wasmFunctionPointer);
  }

  return functionProxy;
}

module.exports = createWasmFunctionProxy;