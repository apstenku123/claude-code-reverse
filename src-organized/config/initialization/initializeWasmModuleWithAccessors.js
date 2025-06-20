/**
 * Initializes global accessors and handlers for a provided WebAssembly module instance.
 *
 * This function normalizes the provided WebAssembly module instance, initializes
 * global accessors for isBlobOrFileLikeObject, and performs any required post-initialization steps.
 *
 * @param {object} wasmModuleInstance - The WebAssembly module instance to initialize.
 * @returns {object} The initialized WebAssembly module accessors.
 */
function initializeWasmModuleWithAccessors(wasmModuleInstance) {
  // Normalize the WebAssembly module instance
  const normalizedWasmModule = aZ(wasmModuleInstance);
  // Initialize global accessors and handlers for the module
  const wasmAccessors = MA(normalizedWasmModule);
  // Perform any required post-initialization steps
  clearLocalStorageByStoreConfig(normalizedWasmModule);
  return wasmAccessors;
}

module.exports = initializeWasmModuleWithAccessors;