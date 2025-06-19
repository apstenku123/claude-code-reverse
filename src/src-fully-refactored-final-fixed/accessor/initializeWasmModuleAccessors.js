/**
 * Initializes global accessors and handlers for a given WebAssembly module instance.
 * This function delegates to initializeWasmAccessors, which manages an initialization counter
 * and invokes a deferred callback when initialization is complete.
 *
 * @param {Object} wasmModuleWrapper - An object containing the WebAssembly module instance.
 * @param {WebAssembly.Instance} wasmModuleWrapper.instance - The actual WebAssembly module instance to initialize accessors for.
 * @returns {void}
 */
function initializeWasmModuleAccessors(wasmModuleWrapper) {
  // Initialize global accessors and handlers for the provided WebAssembly module instance
  initializeWasmAccessors(wasmModuleWrapper.instance);
}

module.exports = initializeWasmModuleAccessors;