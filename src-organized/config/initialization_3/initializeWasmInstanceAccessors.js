/**
 * Initializes global WebAssembly accessors for the provided WebAssembly instance.
 *
 * This function delegates to `initializeWasmAccessors`, which manages the global accessor
 * initialization, including an internal counter and deferred callback when initialization is complete.
 *
 * @param {Object} wasmInstanceWrapper - An object containing the WebAssembly instance to initialize accessors for.
 * @param {WebAssembly.Instance} wasmInstanceWrapper.instance - The actual WebAssembly instance.
 * @returns {void}
 */
function initializeWasmInstanceAccessors(wasmInstanceWrapper) {
  // Initialize global accessors for the provided WebAssembly instance
  initializeWasmAccessors(wasmInstanceWrapper.instance);
}

module.exports = initializeWasmInstanceAccessors;