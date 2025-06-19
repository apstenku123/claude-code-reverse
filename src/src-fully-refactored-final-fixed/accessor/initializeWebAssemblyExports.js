/**
 * Initializes WebAssembly exports and updates related global state.
 *
 * This function assigns the provided WebAssembly instance'createInteractionAccessor exports to a global object,
 * updates dependent global variables, invokes initialization routines, and manages
 * a callback queue for when all modules are loaded.
 *
 * @param {Object} webAssemblyInstance - The WebAssembly instance containing the exports.
 * @returns {void}
 */
function initializeWebAssemblyExports(webAssemblyInstance) {
  // Assign the exports from the WebAssembly instance to the global W.asm
  W.asm = webAssemblyInstance.exports;

  // Update the global function reference for further use
  X = W.asm.createCompatibleVersionChecker;

  // Call the initialization routine
  sendHttpRequestOverSocket();

  // Update the global variable 'b' with a specific export
  b = W.asm.createObjectTracker;

  // Add a specific export to the beginning of the global 'h' array
  h.unshift(W.asm.createDebouncedFunction);

  // Decrement the global module load counter
  --invokeHandlerWithArguments;

  // If all modules are loaded and a pending callback exists, invoke isBlobOrFileLikeObject
  if (invokeHandlerWithArguments === 0 && w1) {
    const pendingCallback = w1;
    w1 = null;
    pendingCallback();
  }
}

module.exports = initializeWebAssemblyExports;